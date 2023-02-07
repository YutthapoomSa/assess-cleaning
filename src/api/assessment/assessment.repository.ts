// import { CreateAssessmentImage } from './dto/create-assessment-image.dto';
import { HttpException, HttpStatus, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResStatus } from './../../share/enum/res-status.enum';
import { AssessmentDB, AssessmentDBTemplateList, AssessmentDBTemplateList2, EnumTemplate } from './../../entities/asessment.entity';
import { UserDB } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { PaginationService } from './../../services/pagination.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AssessmentPaginationDTO, AssessmentPaginationResDTO } from './dto/pagination-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
// import { ImageAssessmentDB } from '../../entities/imageAssessment.entity';
var mongoose = require('mongoose');

export class AssessmentRepository implements OnApplicationBootstrap {
    private logger = new LogService(AssessmentRepository.name);

    constructor(
        @InjectModel(AssessmentDB.name)
        private readonly assessmentModel: Model<AssessmentDB>,

        @InjectModel(AssessmentDBTemplateList.name)
        private readonly assessmentDBTemplateListModel: Model<AssessmentDBTemplateList>,

        @InjectModel(AssessmentDBTemplateList2.name)
        private readonly assessmentDBTemplateList2Model: Model<AssessmentDBTemplateList2>,
        private paginationService: PaginationService, // @InjectModel(ImageAssessmentDB.name) // private readonly ImageAssessmentModel: Model<ImageAssessmentDB>,
    ) { }

    async onApplicationBootstrap() {
        // const result = await this.findOneAssessmentTemplate('633bcccf86fd8b73ec3d5da4');
        // this.logger.debug(result);
    }

    async create(user: UserDB, createAssessmentDto: CreateAssessmentDto) {
        const tag = this.create.name;
        try {
            const _create = new this.assessmentModel();
            _create.templateName = createAssessmentDto.templateName;
            _create.detail = createAssessmentDto.detail;
            _create.title = createAssessmentDto.title;
            _create.templateList = [];

            for (const iterator of createAssessmentDto.templateList) {
                const _assessmentDBTemplateList = new this.assessmentDBTemplateListModel();

                _assessmentDBTemplateList.type = iterator.type;
                _assessmentDBTemplateList.title = iterator.title;
                _assessmentDBTemplateList.min = iterator.min;
                _assessmentDBTemplateList.max = iterator.max;
                _assessmentDBTemplateList.require = iterator.require;
                _assessmentDBTemplateList.imageMax = iterator.imageMax;
                _assessmentDBTemplateList.imageMin = iterator.imageMin;
                _assessmentDBTemplateList.imageRequire = iterator.imageRequire;
                _assessmentDBTemplateList.list = [];

                for (const iterator2 of iterator.list) {
                    const _assessmentDBTemplateList2 = new this.assessmentDBTemplateList2Model();
                    _assessmentDBTemplateList2.title = iterator2.title;
                    _assessmentDBTemplateList2.no = iterator2.no;
                    _assessmentDBTemplateList2.value = iterator2.value;
                    _assessmentDBTemplateList2.imageMin = iterator2.imageMin;
                    _assessmentDBTemplateList2.imageMax = iterator2.imageMax;
                    _assessmentDBTemplateList2.imageRequire = iterator2.imageRequire;
                    // _assessmentDBTemplateList2.ImageId =  await uploadAssessmentImage(ส่งค่าเข้ามา)
                    _assessmentDBTemplateList.list.push(_assessmentDBTemplateList2);
                }

                _create.templateList.push(_assessmentDBTemplateList);
            }

            this.logger.debug(_create);
            return await _create.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOneAssessmentTemplate(id: string) {
        const tag = this.findOneAssessmentTemplate.name;
        try {
            const template = await this.assessmentModel.findById(id);
            if (!template) throw new Error('assessment not found.');
            console.log('Template', JSON.stringify(template));
            return template;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ─────────────────────────────────────────────────────────────────────────────

    async update(body: UpdateAssessmentDto) {
        const tag = this.update.name;
        try {
            const findOne = await this.assessmentModel.findById(body.id);
            if (!findOne) throw new Error('assessment not found.');

            const templateList: AssessmentDBTemplateList[] = [];

            for (const iterator of body.templateList) {
                const _assessmentDBTemplateList = new this.assessmentDBTemplateListModel();
                _assessmentDBTemplateList.type = iterator.type;
                _assessmentDBTemplateList.title = iterator.title;
                _assessmentDBTemplateList.min = iterator.min;
                _assessmentDBTemplateList.max = iterator.max;
                _assessmentDBTemplateList.require = iterator.require;
                _assessmentDBTemplateList.imageMax = iterator.imageMax;
                _assessmentDBTemplateList.imageMin = iterator.imageMin;
                _assessmentDBTemplateList.imageRequire = iterator.imageRequire;
                _assessmentDBTemplateList.list = [];

                for (const iterator2 of iterator.list) {
                    const _assessmentDBTemplateList2 = new this.assessmentDBTemplateList2Model();
                    _assessmentDBTemplateList2.title = iterator2.title;
                    _assessmentDBTemplateList2.no = iterator2.no;
                    _assessmentDBTemplateList2.value = iterator2.value;
                    _assessmentDBTemplateList2.imageMin = iterator2.imageMin;
                    _assessmentDBTemplateList2.imageMax = iterator2.imageMax;
                    _assessmentDBTemplateList2.imageRequire = iterator2.imageRequire;
                    _assessmentDBTemplateList.list.push(_assessmentDBTemplateList2);
                }

                templateList.push(_assessmentDBTemplateList);
            }

            await this.assessmentModel.updateOne(
                {
                    _id: body.id,
                },
                {
                    $set: {
                        templateName: body.templateName,
                        detail: body.detail,
                        title: body.title,
                        templateList: templateList,
                    },
                },
            );

            // const isFind = (_templateIds: string) => {
            //     for (const iterator of body.templateList) {
            //         if (`${iterator._id}` === _templateIds) {
            //             return iterator;
            //         }
            //     }
            //     return null;
            // };

            // if (!!findOne.templateList && findOne.templateList.length > 0) {
            //     for (const iterator of findOne.templateList) {
            //         if (iterator.id === null) {
            //             // create
            //             this.logger.error(`${tag} -> create`);
            //         } else {
            //             const isFind1 = isFind(iterator.id);
            //             if (isFind1) {
            //                 this.logger.error(`${tag} -> update list`);

            //                 await this.assessmentModel.updateOne(
            //                     {
            //                         _id: body._id,
            //                         templateList: {
            //                             $elemMatch: {
            //                                 _id: mongoose.Types.ObjectId(iterator._id),
            //                             },
            //                         },
            //                     },
            //                     {
            //                         $set: {
            //                             'templateList.$.type': isFind1.type,
            //                             'templateList.$.title': isFind1.title,
            //                             'templateList.$.min': isFind1.min,
            //                             'templateList.$.max': isFind1.max,
            //                             'templateList.$.require': isFind1.require,
            //                         },
            //                     },
            //                 );

            //                 // update list

            //                 if (!!iterator.list && iterator.list.length > 0) {
            //                     for (const iterator2 of iterator.list) {
            //                         const isFind = isFind1.list.find((x) => x._id === `${iterator2._id}`);
            //                         if (isFind) {
            //                             this.logger.debug(`${tag} -> update  list`);
            //                             iterator2.title = '111';
            //                             await iterator2.save();
            //                             // update
            //                             // const z = await this.assessmentModel.find(
            //                             //     {
            //                             //         _id: body._id,
            //                             //         templateList: {
            //                             //             $elemMatch: {
            //                             //                 _id: mongoose.Types.ObjectId(iterator._id),
            //                             //             },
            //                             //             $all: {
            //                             //                 list: {
            //                             //                     $elemMatch: {
            //                             //                         _id: mongoose.Types.ObjectId(isFind._id),
            //                             //                     },
            //                             //                 },
            //                             //             },
            //                             //         },
            //                             //     },
            //                             // {
            //                             //     $push: {
            //                             //         'list.$._id': isFind._id,
            //                             //         'list.$.title': isFind.title,
            //                             //         'list.$.no': isFind.no,
            //                             //         'list.$.value': isFind.value,
            //                             //     },
            //                             // },
            //                             // );

            //                             // const z = await this.assessmentDBTemplateList2Model.updateOne(
            //                             //     {
            //                             //         _id: isFind._id,
            //                             //     },
            //                             //     {
            //                             //         $set: {
            //                             //             title: isFind.title,
            //                             //             no: isFind.no,
            //                             //             value: isFind.value,
            //                             //         },
            //                             //     },
            //                             // );
            //                             // const z = await this.assessmentDBTemplateList2Model.findOne({
            //                             //     _id: isFind._id,
            //                             // });
            //                             // this.logger.debug(`${tag} -> z  :`, z);
            //                         } else {
            //                             // del
            //                             this.logger.debug(`${tag} -> delete  list`);
            //                             // await this.assessmentDBTemplateList2Model.deleteOne({ _id: iterator2._id });
            //                         }
            //                     }
            //                 }
            //             } else {
            //                 this.logger.debug(`${tag} -> delete temp list`);
            //                 await this.assessmentDBTemplateListModel.deleteOne({ _id: iterator._id });
            //             }
            //         }
            //     }
            // }

            return findOne;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────────

    async assessmentPagination(paginationDTO: AssessmentPaginationDTO) {
        const tag = this.assessmentPagination.name;
        try {
            const resData = {
                totalItems: 0,
                itemsPerPage: 0,
                totalPages: 0,
                currentPage: paginationDTO.page,
                datas: [],
            };

            let conditionFind = {};

            if (paginationDTO?.search) {
                conditionFind = {
                    $or: [{ templateName: { $regex: '.*' + paginationDTO.search + '.*' } }],
                };
            }

            // จำนวนข้อมูลทั้งหมด ตามเงื่อนไข
            resData.totalItems = await this.assessmentModel.count(conditionFind);

            // คำนวณชุดข้อมูล
            const padding = this.paginationService.paginationCal(resData.totalItems, paginationDTO.perPages, paginationDTO.page);

            resData.totalPages = padding.totalPages;

            resData.datas = await this.assessmentModel.find(conditionFind).select('-__v ').limit(padding.limit).skip(padding.skips);
            this.logger.debug('Data -> ', resData.datas);
            resData.itemsPerPage = resData.datas.length;

            // user ─────────────────────────────────────────────────────────────────────────────────

            const data = new AssessmentPaginationResDTO(
                ResStatus.success,
                '🤓 สำเร็จ 🤓',
                resData.datas,
                resData.totalItems,
                resData.itemsPerPage,
                resData.totalPages,
                resData.currentPage,
            );
            // // this.logger.debug('ResStatus.success -> ',data);
            return data;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ─────────────────────────────────────────────────────────────────────────────

    // async uploadAssessmentImage(imageAssessment: Express.Multer.File[], _id: string) {
    //     const tag = this.uploadAssessmentImage.name;
    //     try {
    //         if (!imageAssessment || imageAssessment.length === 0) {
    //             throw new HttpException(`cannot image user`, HttpStatus.INTERNAL_SERVER_ERROR);
    //         }

    //         const findAssessmentById = await this.findOneAssessmentTemplateImage(_id);

    //         this.logger.debug('imageAssessment -> ', imageAssessment);
    //         if (!findAssessmentById) throw new HttpException(`cannot find assessment by id`, HttpStatus.INTERNAL_SERVER_ERROR);
    //         this.logger.debug('user id data -> ', findAssessmentById);
    //         findAssessmentById.imageAssessment = imageAssessment[0].filename;
    //         await findAssessmentById.save();

    //         return findAssessmentById;
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async findOneAssessmentTemplateImage(_id: string) {
    //     const tag = this.findOneAssessmentTemplateImage.name;
    //     try {
    //         const template = await this.assessmentDBTemplateList2Model.findById(_id);
    //         if (!template) throw new Error('assessment not found.');
    //         return template;
    //     } catch (error) {
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async uploadAssessmentImage(imageAssessment: Express.Multer.File[], body: CreateAssessmentImage) {
    //     const tag = this.uploadAssessmentImage.name;
    //     try {
    //         if (!imageAssessment || imageAssessment.length === 0) {
    //             throw new HttpException(`Cannot Proceed Image Try Again Later !`, HttpStatus.INTERNAL_SERVER_ERROR);
    //         }

    //         const uploadAssessmentImage = new this.ImageAssessmentModel();

    //         for (const iterator of imageAssessment) {
    //             // console.log(iterator.filename);
    //             uploadAssessmentImage.imageName.push(iterator.filename);
    //         }

    //         await uploadAssessmentImage.save();
    //         //    uploadAssessmentImage.imageName  = imageAssessment[0].filename;

    //         // return imageAssessment[0].filename;
    //         console.log("id pics : " , uploadAssessmentImage.id);
    //         // return uploadAssessmentImage; -- return object
    //         return uploadAssessmentImage.id;
    //     } catch (error) {
    //         console.error(`${tag} -> `, error);
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async deleteAssessment(assessmentId: string) {
        const tag = this.deleteAssessment.name;
        try {
            const result = await this.assessmentModel.remove({
                _id: assessmentId,
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

    async findAll() {
        const tag = this.findAll.name;

        try {
            const resultFindAll = await this.assessmentModel.find();
            return resultFindAll;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllCheckList() {
        const tag = this.findAllCheckList.name;

        try {
            const resultFindAll = await this.assessmentModel.find({ templateName: EnumTemplate.checkList }).select('id title templateName');
            if (resultFindAll.length <= 0) throw new Error('No CheckList found');
            return resultFindAll;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllEstimate() {
        const tag = this.findAllEstimate.name;

        try {
            const resultFindAll = await this.assessmentModel.find({ templateName: EnumTemplate.estimate }).select('id title templateName');
            if (resultFindAll.length <= 0) throw new Error('No Estimate found');
            return resultFindAll;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
