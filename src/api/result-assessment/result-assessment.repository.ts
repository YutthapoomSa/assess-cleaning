import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resultAssessmentDB, resultAssessmentDBTemplateList, resultAssessmentDBTemplateList2 } from '../../entities/resultAssement.entity';
import { resultAssessmentImageDB } from '../../entities/resultAssessmentImage';
import { LogService } from '../../services/log.service';
import { UserRepository } from '../user/user.repository';
import { CreateResultAssessmentDto } from './dto/create-result-assessment.dto';
import { uploadResultAssessmentImage } from './dto/upload-result-assessment.dto';
// import { createResultAssessmentImageDTO, uploadResultAssessmentImage } from './dto/upload-result-assessment.dto';

@Injectable()
export class resultAssessmentRepository implements OnApplicationBootstrap {
    private logger = new LogService(resultAssessmentRepository.name);
    constructor(
        @InjectModel(resultAssessmentDB.name) private readonly ResultAssessmentModel: Model<resultAssessmentDB>,
        @InjectModel(resultAssessmentImageDB.name) private readonly resultAssessmentImageModel: Model<resultAssessmentImageDB>,
        @InjectModel(resultAssessmentDBTemplateList.name) private readonly resultAssessmentDBTemplateListModel: Model<resultAssessmentDBTemplateList>,
        @InjectModel(resultAssessmentDBTemplateList2.name)
        private readonly resultAssessmentDBTemplateList2Model: Model<resultAssessmentDBTemplateList2>,
        private readonly UserRepository: UserRepository,
    ) { }

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

    async create(
        // imageAssessment: Express.Multer.File[],
        // CreateAssessmentImage: CreateAssessmentImage,
        // user: UserDB,
        // userId: string,
        // assessmentId: string,
        createResultAssessmentDto: CreateResultAssessmentDto,
    ) {
        const tag = this.create.name;
        // if (!user) throw new Error('Not Authorized :( ');
        if (!createResultAssessmentDto) throw new Error('No Data :( ');
        // console.log('createResultAssessmentDto', createResultAssessmentDto);
        try {
            let user = null;
            if (createResultAssessmentDto?.userId) {
                user = await this.UserRepository.findOneUser(createResultAssessmentDto.userId);
            }

            // if (!user) throw new Error('invalid userId try again later');
            const _create = new this.ResultAssessmentModel();
            _create.userId = createResultAssessmentDto.userId ? createResultAssessmentDto.userId : null;
            _create.firstName = user?.firstName ? user.firstName : null;
            _create.assessmentId = createResultAssessmentDto.assessmentId;

            _create.templateName = createResultAssessmentDto.templateName;
            _create.assessmentDetail = createResultAssessmentDto.assessmentDetail;
            _create.title = createResultAssessmentDto.title;
            _create.titlePictureId = [];
            for (const iterator of createResultAssessmentDto.titlePictureId) {
                _create.titlePictureId.push(iterator);
            }
            _create.resultValue = createResultAssessmentDto.resultValue;
            _create.templateList = [];

            console.log(createResultAssessmentDto.templateList.length);
            if (createResultAssessmentDto.templateList.length > 0) {
                for (const iterator of createResultAssessmentDto.templateList) {
                    const _createTemplateList = new this.resultAssessmentDBTemplateListModel();
                    _createTemplateList.title = iterator.title;
                    _createTemplateList.list = [];
                    console.log('iterator', iterator);
                    // console.log('list', iterator.list, 'list length', iterator.list.length);
                    if (iterator.list) {
                        for (const iterator2 of iterator.list) {
                            const _createResultAssessmentDBTemplateList2 = new this.resultAssessmentDBTemplateList2Model();
                            _createResultAssessmentDBTemplateList2.title = iterator2.title;
                            _createResultAssessmentDBTemplateList2.no = iterator2.no;
                            _createResultAssessmentDBTemplateList2.value = iterator2.value;
                            _createResultAssessmentDBTemplateList2.imageAssessment = [];
                            for (const iterator3 of iterator2.pictureId) {
                                _createResultAssessmentDBTemplateList2.imageAssessment.push(iterator3);
                            }
                            _createTemplateList.list.push(_createResultAssessmentDBTemplateList2);
                        }
                    }
                    // push
                    _create.templateList.push(_createTemplateList);
                }
            }
            await _create.save();
            console.log('_create', _create);
            return _create;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(_id: string) {
        const tag = this.findOne.name;
        try {
            const resultFindOne = await this.ResultAssessmentModel.findById(_id);
            return resultFindOne;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        const tag = this.findAll.name;

        try {
            const resultFindAll = await this.ResultAssessmentModel.find();
            // this.logger.debug (resultFindAll);
            return resultFindAll;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isFinishResultAssessment(id: string) {
        const tag = this.isFinishResultAssessment.name;
        try {
            const result = await this.ResultAssessmentModel.count({ _id: id });
            if (result > 0) throw new Error('this user has created a resultAssessment');
            return null;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneResultAssessment(id: string) {
        const tag = this.findOneResultAssessment.name;

        try {
            const resultFindOneResultAssessment = await this.ResultAssessmentModel.findById(id);
            return resultFindOneResultAssessment;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllImagePath() {
        const tag = this.findAllImagePath.name;
        try {
            const resultAllImagePath = await this.resultAssessmentImageModel.find();
            // console.log('resultAllImage', resultAllImagePath);
            return resultAllImagePath;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove() {
        const tag = this.remove.name;
        try {
            const resultRemoveResultAssessment = await this.ResultAssessmentModel.remove();

            if (resultRemoveResultAssessment.deletedCount > 0) {
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

    async uploadResultAssessmentImage(imageAssessment: Express.Multer.File[], body: uploadResultAssessmentImage) {
        const tag = this.uploadResultAssessmentImage.name;
        try {
            if (!imageAssessment || imageAssessment.length === 0) {
                throw new HttpException(`Cannot Proceed Image Try Again Later !`, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const resultUploadAssessmentImage = new this.resultAssessmentImageModel();
            // console.log('uploadResultAssessmentImage', resultUploadAssessmentImage);

            for (const iterator of imageAssessment) {
                console.log(iterator.filename);
                resultUploadAssessmentImage.resultAssessmentImage = iterator.filename;
            }

            // console.log('uploadResultAssessmentImage', resultUploadAssessmentImage);

            await resultUploadAssessmentImage.save();
            //    uploadAssessmentImage.imageName  = imageAssessment[0].filename;

            // return imageAssessment[0].filename;
            // console.log('id pics : ', resultUploadAssessmentImage.id);
            // return resultUploadAssessmentImage; -- return object
            return resultUploadAssessmentImage;
            // return 'eiei';
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ────────────────────────────────────────────────────────────────────────────────

    // async updateZone(zoneId: string, body: UpdateZoneDto) {
    //     const tag = this.updateZone.name;
    //     try {
    //         this.logger.debug('zoneId -> ', zoneId);
    //         const updateZone = await this.zoneModel.update(
    //             {
    //                 _id: zoneId,
    //             },
    //             {
    //                 $set: {
    //                     name: body.name,
    //                     zoneList: body.zoneList,
    //                     checkList: new mongoose.Types.ObjectId(body.checkList),
    //                     estimate: new mongoose.Types.ObjectId(body.estimate),
    //                 },
    //             },
    //         );

    //         return await this.getZoneById(zoneId);
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async getZoneById(_zoneId: string) {
    //     const tag = this.getZoneById.name;
    //     try {
    //         const resultZone = await this.zoneModel.findById({ _id: _zoneId }).select('-__v ');
    //         return resultZone;
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async deleteZone(zoneId: string) {
    //     const tag = this.deleteZone.name;
    //     try {
    //         const result = await this.zoneModel.remove({
    //             _id: zoneId,
    //         });
    //         if (result.deletedCount > 0) {
    //             return '♥ ลบข้อมูลสำเร็จ ♥';
    //         } else {
    //             return '☻ เกิดข้อผิดพลาดโปรดลองใหม่อีกครั้งในภายหลัง ! ☻';
    //         }
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async updateZoneReport(_id: string, body: ZoneReportReqDTO) {
    //     const tag = this.updateZoneReport.name;
    //     try {

    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new InternalServerErrorException(error);
    //     }
    // }

    // ────────────────────────────────────────────────────────────────────────────────

    // async zonePagination(paginationDTO: ZonePaginationDTO) {
    //     const tag = this.zonePagination.name;
    //     try {
    //         const resData = {
    //             totalItems: 0,
    //             itemsPerPage: 0,
    //             totalPages: 0,
    //             currentPage: paginationDTO.page,
    //             data: [],
    //         };

    //         let conditionFind = {};

    //         if (paginationDTO?.search) {
    //             conditionFind = {
    //                 $or: [{ name: { $regex: '.*' + paginationDTO.search + '.*' } }],
    //             };
    //         }

    //         // จำนวนข้อมูลทั้งหมด ตามเงื่อนไข
    //         resData.totalItems = await this.zoneModel.count(conditionFind);

    //         // คำนวณชุดข้อมูล
    //         const padding = this.paginationService.paginationCal(resData.totalItems, paginationDTO.perPages, paginationDTO.page);

    //         resData.totalPages = padding.totalPages;

    //         resData.data = await this.zoneModel.find(conditionFind).select('-__v ').limit(padding.limit).skip(padding.skips);

    //         if (resData.data.length > 0) {
    //             for (const iterator of resData.data) {
    //                 // resData.data[iterator].checkList = await this.findCheckList(iterator.checkList);

    //                 console.log(resData.data[iterator].checkList);
    //             }
    //         }

    //         resData.itemsPerPage = resData.data.length;

    //         // user ─────────────────────────────────────────────────────────────────────────────────

    //         return new ZonePaginationResDTO(
    //             ResStatus.success,
    //             '',
    //             resData.data,
    //             resData.totalItems,
    //             resData.itemsPerPage,
    //             resData.totalPages,
    //             resData.currentPage,
    //         );
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async findPictureById(id: string) {
        const tag = this.findPictureById.name;
        try {
            if (!id) throw new Error('wrong format try again later :( ');

            const resultImage = await this.resultAssessmentImageModel.findById(id);
            return resultImage;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
