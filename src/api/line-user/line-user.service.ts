import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResDTO } from '../global-dto/global-res.dto';
import { LogService } from './../../services/log.service';
import { PaginationService } from './../../services/pagination.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { addUserToLineUserDTOReq } from './dto/add-user-to-line-user.dto';
import { AddUserToLineUserDTORes } from './dto/addUserToLineUserRes.dto';
import { FindLineUserResDTO } from './dto/find-line-user-byId.dto';
import { FindLineUserByUserLineIdResDTO } from './dto/findLineuser-by-lineuserId.dto';
import { FindOneLineUserDTO } from './dto/findOne.dto';
import { LinePaginationDTOData, LinePaginationDTOResData } from './dto/LinePagination.dto';
import { UpdateLineUserReqDTO, UpdateLineUserResDTO } from './dto/update-line-user.dto';
import { LineUserDB } from './entities/line-user.entity';

@Injectable()
export class LineUserService {
    private logger = new LogService(LineUserService.name);
    constructor(@InjectModel(LineUserDB.name) private readonly lineUserModel: Model<LineUserDB>, private paginationService: PaginationService) { }

    async create(userId: string, disPlayName: string) {
        const tag = this.create.name;
        try {
            const create = new this.lineUserModel({
                userLineId: userId,
                name: disPlayName || '',
                userId: null,
            });
            return await create.save();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addUserToLineUser(body: addUserToLineUserDTOReq) {
        const tag = this.addUserToLineUser.name;
        try {
            const isFind = await this.lineUserModel.count({ userLineId: body.userLineId });
            if (isFind <= 0) throw new Error('No Data Found Try Again Later');
            const addUser = await this.lineUserModel.updateOne(
                { userLineId: body.userLineId },
                {
                    $set: {
                        userId: body.userId,
                    },
                },
            );
            if (!addUser) throw new Error('something went wrong try again later');
            if (addUser.modifiedCount > 0) {
                return new AddUserToLineUserDTORes(ResStatus.success, 'เชื่อมUserกับLineUserสำเร็จ');
                // return 'เชื่อมUserกับLineUserสำเร็จ';
            } else {
                return new AddUserToLineUserDTORes(ResStatus.success, 'อัพเดทข้อมูลไม่สำเร็จโปรดเช็คข้อมูลใหม่');
                // return 'อัพเดทข้อมูลไม่สำเร็จโปรดเช็คข้อมูลใหม่';
            }
            // return addUser;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        return `This action returns all lineUser`;
    }

    async findOne(userId: string) {
        const tag = this.findOne.name;
        try {
            if (!userId) throw new Error('userId is required');
            const findUser = await this.lineUserModel.findOne({ userId: userId }).populate('userId');
            if (!findUser) throw new Error('can not find user try again later');
            return new FindOneLineUserDTO(ResStatus.success, '', findUser);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findLineUserById(id: string) {
        const tag = this.findLineUserById.name;
        try {
            if (!id) throw new Error('id is required');
            const resultLine = await this.lineUserModel.findOne({ _id: id });
            if (!resultLine) throw new Error('not found try again later');
            return new FindLineUserResDTO(ResStatus.success, '', resultLine);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateLineUserById(id: string, body: UpdateLineUserReqDTO) {
        const tag = this.updateLineUserById.name;
        try {
            if (!id) throw new Error('id is required');
            if (!body) throw new Error('data is required');
            const findUser = await this.lineUserModel.findOne({ _id: id });
            if (!findUser) throw new Error('user not found try again later');
            findUser.userId = body.userId;
            findUser.userLineId = body.userLineId;
            await findUser.save();

            return new UpdateLineUserResDTO(ResStatus.success, '', findUser);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return await updateLineUserById(id, body);
    }

    async findLineUserByLineUserId(lineUserId: string) {
        const tag = this.findLineUserByLineUserId.name;
        try {
            if (!lineUserId) throw new Error('lineUserId is required');
            const ResultUser = await this.lineUserModel.findOne({ userLineId: lineUserId });
            if (!ResultUser) throw new Error('no data found try again later');
            return new FindLineUserByUserLineIdResDTO(ResStatus.success, '', ResultUser);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async paginationLineUser(paginationDTO: LinePaginationDTOData) {
        const tag = this.paginationLineUser.name;
        try {
            const resData: any = {
                totalItems: 0,
                itemsPerPage: 0,
                totalPages: 0,
                currentPage: paginationDTO.page,
                data: [],
            };

            let conditionFind = {};

            if (paginationDTO?.search) {
                conditionFind = {
                    $or: [
                        { name: { $regex: '.*' + paginationDTO.search + '.*' } },
                        { userId: { $regex: '.*' + paginationDTO.search + '.*' } },
                        { _id: { $regex: '.*' + paginationDTO.search + '.*' } },
                        { userLineId: { $regex: '.*' + paginationDTO.search + '.*' } },
                    ],
                };
            }

            // จำนวนข้อมูลทั้งหมด ตามเงื่อนไข
            resData.totalItems = await this.lineUserModel.count(conditionFind);

            // คำนวณชุดข้อมูล
            const padding = this.paginationService.paginationCal(resData.totalItems, paginationDTO.perPages, paginationDTO.page);

            resData.totalPages = padding.totalPages;

            resData.data = await this.lineUserModel
                .find(conditionFind)
                // .select('name userId workList ')
                // .populate({
                //     path: 'workList',
                //     populate: [
                //         {
                //             path: 'workList',
                //         },
                //         {
                //             path: 'zone',
                //             populate: { path: 'checkList estimate' },
                //         },
                //     ],
                // })
                .limit(padding.limit)
                .skip(padding.skips)
                .populate('userId');

            resData.itemsPerPage = resData.data.length;

            return new LinePaginationDTOResData(
                ResStatus.success,
                '',
                resData.data,
                resData.totalItems,
                resData.itemsPerPage,
                resData.totalPages,
                resData.currentPage,
            );

            // return resData.data;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findUserIdFromLineUserId(lineUserId: string) {
        const tag = this.findUserIdFromLineUserId.name;
        try {
            const user = await this.lineUserModel.findOne({ userLineId: lineUserId });
            if (!user) return null;
            return user.userId;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkUserId(userId: string) {
        const tag = this.checkUserId.name;
        try {
            const isFind = await this.lineUserModel.count({ userLineId: userId });
            console.log('userId : ', userId);

            return isFind;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateLineUser(userId: string, name: string) {
        const tag = this.updateLineUser.name;
        try {
            if (!userId) return;
            if (!name) return;
            const isFind = await this.lineUserModel.count({ userLineId: userId });
            if (isFind <= 0) return;
            await this.lineUserModel.updateOne(
                { userLineId: userId },
                {
                    $set: {
                        name: name,
                    },
                },
            );
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const tag = this.remove.name;
        try {
            if (!id) throw new Error('LineUser Id is required try again later :)');
            const isFind = await this.lineUserModel.findOne({ _id: id });
            // console.log(isFind);
            if (!isFind) throw new Error('user not found try again later');
            const removeLineUser = await isFind.remove();
            // console.log(removeLineUser);
            return new GlobalResDTO(ResStatus.success, 'ลบข้อมูลสำเร็จ');

            // return await isFind.remove();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
