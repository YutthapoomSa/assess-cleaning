import { LogService } from './../../services/log.service';
import { FlexMassageTemplateNo1Service } from './../../services/flex-massage-template-no1.service';
import { CreateTaskDTO } from './../task/dto/create-task.dto';
import {
    QuickReplyMessage,
    ReplyFlexMessage,
    ReplyQuickMessage,
    ReplyTokenMassage,
    ResGetContent,
    TOKEN,
} from './../../services/third-party-line.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { ThirdPartyLineService } from '../../services/third-party-line.service';
import { TaskService } from './../task/task.service';
import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from '@nestjs/common';
import Jimp from 'jimp';
import { LineUserService } from '../line-user/line-user.service';
import { CreateLineUserReqDto } from '../line-user/dto/create-line-user.dto';
import {
    // main APIs
    Client,
    middleware,

    // exceptions
    JSONParseError,
    SignatureValidationFailed,

    // types
    TemplateMessage,
    WebhookEvent,
} from '@line/bot-sdk';
import { UserRepository } from '../user/user.repository';
import { ZoneRepository } from '../zone/zone.repository';
import { ConfigService } from './../../config/config.service';
const QrCode = require('qrcode-reader');

@Injectable()
export class WebhookService {
    private logger = new LogService(WebhookService.name);

    constructor(
        @Inject(forwardRef(() => TaskService))
        @Inject(forwardRef(() => UserRepository))
        private taskService: TaskService,
        private lineUserService: LineUserService,
        private ThirdPartyLineService: ThirdPartyLineService,
        private UserRepository: UserRepository,
        private zoneRepository: ZoneRepository,
    ) {
        this.ThirdPartyLineService;
    }

    // async connectWebhook(body: CreateWebhookDto) {
    async connectWebhook(body: any) {
        const tag = this.connectWebhook.name;
        try {
            if (body.events.length === 0) return null;
            let event = body.events[0];
            // console.log('event', JSON.stringify(event, null, 2));
            const groupId = event.source.groupId;
            let userId = null;
            if (event.source.userId) {
                userId = event.source.userId;
                await this.getGroupMemberProfile(groupId, userId, event);
            } else if (event.joined?.members[0].userId && !!event.joined && !!event) {
                userId = event.joined.members[0].userId;
                await this.getGroupMemberProfile(groupId, userId, event);
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getGroupMemberProfile(groupId: string, userId: string, event: any) {
        const tag = this.getGroupMemberProfile.name;
        try {
            const client = new Client({
                channelAccessToken: TOKEN,
            });
            // console.log('event', event);
            // console.log('groupId', groupId);
            // console.log('userId', userId);
            client.getGroupMemberProfile(groupId, userId).then(async (profile: any) => {
                // console.log(JSON.stringify(profile, null, 2));
                // console.log('eventType : ', event.type);
                switch (event.type) {
                    case 'message':
                        if (event.message.type === 'image') {
                            let resGetContent: ResGetContent = null;
                            await this.ThirdPartyLineService.getContent(event.message.id).then(
                                (resp) => {
                                    resGetContent = resp;
                                },
                                (err) => {
                                    this.logger.error(`${tag} -> err : `, err);
                                },
                            );
                            await this.readQrAndSend(resGetContent, event, profile.userId);
                        }
                        // else if (event.message.type === 'text'){

                        // }
                        break;
                    case 'memberJoined':
                        // console.log(JSON.stringify(event.joined.members, null, 2));
                        if (!event.joined.members[0].userId) return;
                        // console.log('eventMemberJoined UserId : ', event.joined.members[0].userId);
                        const userId = event.joined.members[0].userId;
                        const isFind = await this.lineUserService.checkUserId(userId);
                        // console.log('membejoined isFind', isFind);
                        if (isFind === 0) {
                            await this.lineUserService.create(userId, profile.displayName);
                        }
                        break;
                }
                if (profile) {
                    await this.lineUserService.updateLineUser(profile.userId, profile.displayName);
                }
            });
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async readQrAndSend(resGetContent: any, event: any, lineUserId: string) {
        const tag = this.readQrAndSend.name;
        return new Promise(async (resolve, reject) => {
            try {
                const resultQrCode = await this.readQr(resGetContent.path);

                // can't read
                if (resultQrCode === null) {
                    const replyMessage: ReplyTokenMassage = {
                        replyToken: event.replyToken,
                        messages: [],
                    };
                    replyMessage.messages.push({
                        type: 'text',
                        text: String('อ่านไม่ได้ ไม่ใช่ไฟล์ภาพQrCode หรือ QrCode ไม่ชัด โปรดลองใหม่อีกครั้ง'),
                    });

                    this.ThirdPartyLineService.reply(replyMessage).subscribe(
                        (resp) => {
                            return resolve(resp);
                        },
                        //
                        (err) => {
                            return reject(err);
                        },
                    );
                } else {
                    const lineUser = await this.lineUserService.findUserIdFromLineUserId(lineUserId);
                    const isFindZone = await this.zoneRepository.ifZoneExists(String(resultQrCode));
                    // console.log(zone);
                    if (!lineUser && isFindZone == 1) {
                        const config = new ConfigService();
                        const zone: any = await this.zoneRepository.getZoneById(resultQrCode);
                        let estimateWithoutUserId =
                            config.lineCheckListEstimatePath().estimate + !!zone.estimate._id
                                ? `${String(zone.estimate._id)}`
                                : 'ไม่พบข้อมูลของestimate' +
                                  '&&' +
                                  // config.userIdPath().userId +
                                  // `${userId}` +
                                  // '&&' +
                                  config.zoneIdPath().zoneId +
                                  `${String(resultQrCode)}` +
                                  '&&' +
                                  config.templateType().templateType +
                                  'estimate';
                        const replyMessage: ReplyTokenMassage = {
                            replyToken: event.replyToken,
                            messages: [],
                        };
                        replyMessage.messages.push({
                            type: 'text',
                            text: estimateWithoutUserId,
                            // + ' /n UserId :' + String(lineUser),
                        });

                        this.ThirdPartyLineService.reply(replyMessage).subscribe(
                            (resp) => {
                                return resolve(resp);
                            },
                            (err) => {
                                return reject(err);
                            },
                        );
                    }
                    console.log(lineUser);
                    const isIn = await this.UserRepository.findIsInWorkListZone(lineUser, String(resultQrCode));
                    // if (zone == 0 && isIn == 'ไม่พบข้อมูล') {
                    // if (zone == 0) {
                    //     const replyMessage: ReplyTokenMassage = {
                    //         replyToken: event.replyToken,
                    //         messages: [],
                    //     };
                    //     replyMessage.messages.push({
                    //         type: 'text',
                    //         text: String('คุณไม่มีงานที่ได้รับมอบหมายในพื้นที่นี้ หรือ ไม่มีโซนนี้อยู่'),
                    //     });

                    //     this.ThirdPartyLineService.reply(replyMessage).subscribe(
                    //         (resp) => {
                    //             return resolve(resp);
                    //         },
                    //         (err) => {
                    //             return reject(err);
                    //         },
                    //     );
                    // } else {
                    // canRead
                    const replyMessage: ReplyTokenMassage = {
                        replyToken: event.replyToken,
                        messages: [],
                    };
                    replyMessage.messages.push({
                        type: 'text',
                        text: isIn,
                        // + ' /n UserId :' + String(lineUser),
                    });

                    this.ThirdPartyLineService.reply(replyMessage).subscribe(
                        (resp) => {
                            return resolve(resp);
                        },
                        (err) => {
                            return reject(err);
                        },
                    );
                }
                // }
            } catch (error) {
                console.error(`${tag} -> `, error);
                this.logger.error(`${tag} -> `, error);
                return reject(error);
            }
        });
    }

    async readQr(fullPart: string) {
        const tag = this.readQr.name;
        return new Promise((resolve, reject) => {
            try {
                Jimp.read(fullPart, (err: any, image: any) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    // Creating an instance of qrcode-reader module
                    let qrcode = new QrCode();

                    qrcode.callback = (err: any, value: any) => {
                        if (err) {
                            console.error(err);
                            // return reject(err);
                        }
                        if (value) {
                            // อ่านได้
                            console.log(value.result);
                            return resolve(value.result);
                        } else {
                            // อ่าน qrcode ไม่ได้
                            return resolve(null);
                        }
                    };

                    // Decoding the QR code
                    qrcode.decode(image.bitmap);
                });
            } catch (error) {
                console.error(`${tag} -> `, error);
                this.logger.error(`${tag} -> `, error);
                return reject(error);
            }
        });
    }
}
