import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GlobalResDTO } from '../global-dto/global-res.dto';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateResultAssessmentDto, CreateResultAssessmentResDTO } from './dto/create-result-assessment.dto';
import { findAllResultAssessmentImagePathDTO } from './dto/findAll-resultAssessment-imagepath.dto';
import { FindAllResultAssessmentResDTO } from './dto/findAll-resultAssessment.dto';
import { findOnePathResultAssessmentImageDTO } from './dto/findOne-PathResultAssessmentImage.dto';
import { findOneImageResultAssessmentPathDTO } from './dto/findOne-result-assessment-ImagePath.dto';
import { FindOneResultAssessmentResDTO } from './dto/findOne-ResultAssessment.dto';
import { UpdateResultAssessmentDto } from './dto/update-result-assessment.dto';
import { uploadResultAssessmentImage } from './dto/upload-result-assessment.dto';
import { resultAssessmentRepository } from './result-assessment.repository';
// import { CreateAssessmentImage } from '../assessment/dto/create-assessment-image.dto';
@Injectable()
export class ResultAssessmentService {
    private logger = new LogService(ResultAssessmentService.name);
    constructor(private readonly ResultAssessmentRepository: resultAssessmentRepository) { }
    private resultAssessmentService: ResultAssessmentService;

    async uploadResultAssessmentImage(imageAssessment: Express.Multer.File[], uploadResultAssessmentImage: uploadResultAssessmentImage) {
        const tag = this.uploadResultAssessmentImage.name;
        try {
            console.log('#1 -> ', imageAssessment);
            const resultUploadAssessmentImage = await this.ResultAssessmentRepository.uploadResultAssessmentImage(
                imageAssessment,
                uploadResultAssessmentImage,
            );

            return new findOnePathResultAssessmentImageDTO(ResStatus.success, '', resultUploadAssessmentImage);
            // return null;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(
        // imageAssessment: Express.Multer.File[],
        // CreateAssessmentImage: CreateAssessmentImage,
        // user: UserDB,
        // userId: string,
        // assessmentId: string,
        createResultAssessmentDto: CreateResultAssessmentDto,
    ) {
        const tag = this.create.name;
        try {
            const resultCreateResultAssessment: any = await this.ResultAssessmentRepository.create(
                // imageAssessment,
                // CreateAssessmentImage,
                // userId,
                // assessmentId,
                createResultAssessmentDto,
            );
            return new CreateResultAssessmentResDTO(ResStatus.success, 'สำเร็จ', resultCreateResultAssessment);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return `This action returns create resultAssessment`;
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const resultResultAssessment = await this.ResultAssessmentRepository.findAll();
            return new FindAllResultAssessmentResDTO(ResStatus.success, '', resultResultAssessment);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return `This action returns all resultAssessment`;
    }

    async findOne(id: string) {
        const tag = this.findOne.name;
        try {
            const resultFindOne: any = await this.ResultAssessmentRepository.findOne(id);
            return new FindOneResultAssessmentResDTO(ResStatus.success, '', resultFindOne);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllImagePath() {
        const tag = this.findAllImagePath.name;
        try {
            const resultAllImagePath = await this.ResultAssessmentRepository.findAllImagePath();
            return new findAllResultAssessmentImagePathDTO(ResStatus.success, '', resultAllImagePath);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isFinishResultAssessment(id: string) {
        const tag = this.isFinishResultAssessment.name;
        try {
            const result = await this.ResultAssessmentRepository.isFinishResultAssessment(id);
            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    update(id: number, updateResultAssessmentDto: UpdateResultAssessmentDto) {
        return `This action updates a #${id} resultAssessment`;
    }

    async remove() {
        const tag = this.remove.name;
        try {
            const removeResultAssessment = await this.ResultAssessmentRepository.remove();

            return new GlobalResDTO(ResStatus.success, 'ลบข้อมูลสำเร็จ');
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPictureById(id: string) {
        const tag = this.findPictureById.name;
        try {
            const resultPicture = await this.ResultAssessmentRepository.findPictureById(id);

            return new findOneImageResultAssessmentPathDTO(ResStatus.success, '', resultPicture);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
