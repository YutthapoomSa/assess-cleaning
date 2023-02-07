import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserDB } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { AssessmentRepository } from './assessment.repository';
import { CreateAssessmentDTO, CreateAssessmentDto } from './dto/create-assessment.dto';
import { DeleteAssessmentResDTO } from './dto/delete-assessment.dto';
import { findAllCheckListAndEstimateDTO } from './dto/FindAllCheckList-Estimate.dto';
import { FindOneAssessmentDTO } from './dto/findOne-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService implements OnApplicationBootstrap {
    private logger = new LogService(AssessmentService.name);

    constructor(private readonly assessmentRepository: AssessmentRepository) {}
    onApplicationBootstrap() {}

    // ────────────────────────────────────────────────────────────────────────────────

    async createAssessment(user: UserDB, body: CreateAssessmentDto) {
        const tag = this.createAssessment.name;
        try {
            const resultAssessment = await this.assessmentRepository.create(user, body);
            this.logger.debug(`${tag} -> `, resultAssessment);
            return new CreateAssessmentDTO(ResStatus.success, 'สร้างแบบฟอร์มสำเร็จ', resultAssessment.id);
            // return this.findOne(resultAssessment.id);

            // return new FindOneAssessmentDTO(ResStatus.success, 'สร้างข้อมูลสำเร็จ',resultAssessment);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ─────────────────────────────────────────────────────────────────────────────

    // เรียกข้อมูลขาออก

    async findOne(id: string) {
        const tag = this.findOne.name;
        try {
            const findOne = await this.assessmentRepository.findOneAssessmentTemplate(id);
            return new FindOneAssessmentDTO(ResStatus.success, 'สำเร็จ', findOne);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────────

    async update(body: UpdateAssessmentDto) {
        const tag = this.update.name;
        try {
            const findOne = await this.assessmentRepository.update(body);
            return this.findOne(findOne._id);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteAssessmentById(assessmentId: string) {
        const tag = this.deleteAssessmentById.name;
        try {
            const resultDeleteAssessment = await this.assessmentRepository.deleteAssessment(assessmentId);
            return new DeleteAssessmentResDTO(ResStatus.success, '♥ ลบข้อมูลสำเร็จ ♥');
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const findAllAssessment = await this.assessmentRepository.findAll();
            return findAllAssessment;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllCheckList() {
        const tag = this.findAllCheckList.name;
        try {
            const findAllAssessment = await this.assessmentRepository.findAllCheckList();
            return new findAllCheckListAndEstimateDTO(ResStatus.success, '', findAllAssessment);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllEstimate() {
        const tag = this.findAllEstimate.name;
        try {
            const findAllAssessment = await this.assessmentRepository.findAllEstimate();
            return new findAllCheckListAndEstimateDTO(ResStatus.success, '', findAllAssessment);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
