import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ZoneDB } from './../../entities/zone.entity';
import { LogService } from './../../services/log.service';
import { PaginationService } from './../../services/pagination.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateZoneReqDto } from './dto/create-zone.dto';
import { ZonePaginationDTO, ZonePaginationResDTO } from './dto/pagination-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZoneRepository implements OnApplicationBootstrap {
    private logger = new LogService(ZoneRepository.name);

    constructor(
        @InjectModel(ZoneDB.name) private readonly zoneModel: Model<ZoneDB>,
        // @InjectModel(AssessmentDB.name) private readonly assessmentModel: Model<AssessmentDB>,

        // @InjectModel(ZoneReport.name) private readonly zoneReportModel: Model<ZoneReport>,
        private paginationService: PaginationService,
    ) {}

    async onApplicationBootstrap() {
        // let zone = await this.zoneModel.create({
        //     name: CreateZoneDto.name,
        //     zoneList: ['test'],
        //     zoneReport: [
        //         {
        //             title: faker.name.firstName(),
        //             detail: faker.lorem.lines(1),
        //             image: ['test.png'],
        //             user: '6332932d3cf4c6f4561de1ba',
        //         },
        //     ],
        // });
    }

    // [function]───────────────────────────────────────────────────────────────────────

    async create(createZoneDto: CreateZoneReqDto) {
        const tag = this.create.name;
        let zone: ZoneDB = null;
        try {
            // if (!!createZoneDto.checkList && createZoneDto.checkList.length > 0 && !!createZoneDto.estimate && createZoneDto.estimate.length > 0) {
            zone = await this.zoneModel.create({
                name: createZoneDto.name,
                zoneList: createZoneDto.zoneList,
                zoneReport: [],
                checkList: createZoneDto.checkList ? new mongoose.Types.ObjectId(createZoneDto.checkList) : null,
                estimate: createZoneDto.estimate ? new mongoose.Types.ObjectId(createZoneDto.estimate) : null,
            });
            // } else {
            //     throw new Error('checkList or estimate is invalid type');
            // }
            return zone;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllZone() {
        const tag = this.findAllZone.name;

        try {
            const resultAllZone = await this.zoneModel.find().select('id , name');
            return resultAllZone;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async createZoneReport(zoneReportDTO: ZoneReportReqDTO) {
    //     const tag = this.createZoneReport.name;
    //     try {
    //         let zoneReport = await this.zoneReportModel.create({
    //             title: zoneReportDTO.title,
    //             detail: zoneReportDTO.detail,
    //             image: zoneReportDTO.image,
    //             createAt: zoneReportDTO.createAt,
    //         });
    //         return zoneReport;
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    // ────────────────────────────────────────────────────────────────────────────────

    async updateZone(zoneId: string, body: UpdateZoneDto) {
        const tag = this.updateZone.name;
        try {
            this.logger.debug('zoneId -> ', zoneId);
            const zone = await this.zoneModel.findById(zoneId);
            if (!zone) throw new Error('zone not found');
            const updateZone = await this.zoneModel.update(
                {
                    _id: zoneId,
                },
                {
                    $set: {
                        name: !!body.name ? body.name : zone.name,
                        zoneList: !!body.zoneList ? body.zoneList : zone.zoneList,
                        checkList: !!body.checkList ? new mongoose.Types.ObjectId(body.checkList) : zone.checkList,
                        estimate: !!body.estimate ? new mongoose.Types.ObjectId(body.estimate) : zone.estimate,
                    },
                },
            );

            return await this.getZoneById(zoneId);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getZoneById(_zoneId: any) {
        const tag = this.getZoneById.name;
        try {
            const resultZone = await this.zoneModel.findById({ _id: _zoneId }).select('-__v ').populate({
                path: 'checkList estimate',
                // populate: [
                //     {
                //         path: 'workList',
                //     },
                //     {
                //         path: 'zone',
                //         populate: { path: 'checkList estimate' },
                //     },
                // ],
            });
            // console.log('resultZone', resultZone);
            return resultZone;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            // throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async ifZoneExists(_zoneId: string) {
        const tag = this.ifZoneExists.name;
        try {
            const resultZone = await this.zoneModel.count({ _id: _zoneId });
            if (!resultZone) return 0;
            return resultZone;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            return 0;
        }
    }

    async deleteZone(zoneId: string) {
        const tag = this.deleteZone.name;
        try {
            const result = await this.zoneModel.remove({
                _id: zoneId,
            });
            if (result.deletedCount > 0) {
                return '♥ ลบข้อมูลสำเร็จ ♥';
            } else {
                return '☻ เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งในภายหลัง ! ☻';
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async updateZoneReport(_id: string, body: ZoneReportReqDTO) {
    //     const tag = this.updateZoneReport.name;
    //     try {

    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    // ────────────────────────────────────────────────────────────────────────────────

    async zonePagination(paginationDTO: ZonePaginationDTO) {
        const tag = this.zonePagination.name;
        try {
            const resData = {
                totalItems: 0,
                itemsPerPage: 0,
                totalPages: 0,
                currentPage: paginationDTO.page,
                data: [],
            };

            let conditionFind = {};

            if (paginationDTO?.search) {
                conditionFind = {
                    $or: [{ name: { $regex: '.*' + paginationDTO.search + '.*' } }],
                };
            }

            // จำนวนข้อมูลทั้งหมด ตามเงื่อนไข
            resData.totalItems = await this.zoneModel.count(conditionFind);

            // คำนวณชุดข้อมูล
            const padding = this.paginationService.paginationCal(resData.totalItems, paginationDTO.perPages, paginationDTO.page);

            resData.totalPages = padding.totalPages;

            resData.data = await this.zoneModel.find(conditionFind).select('-__v ').limit(padding.limit).skip(padding.skips);

            resData.itemsPerPage = resData.data.length;

            // user ─────────────────────────────────────────────────────────────────────────────────

            return new ZonePaginationResDTO(
                ResStatus.success,
                '',
                resData.data,
                resData.totalItems,
                resData.itemsPerPage,
                resData.totalPages,
                resData.currentPage,
            );
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
