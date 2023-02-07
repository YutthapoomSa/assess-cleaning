import { Injectable } from '@nestjs/common';
import { CreateImageAssessmentDto } from './dto/create-image-assessment.dto';
import { UpdateImageAssessmentDto } from './dto/update-image-assessment.dto';

@Injectable()
export class ImageAssessmentService {
  create(createImageAssessmentDto: CreateImageAssessmentDto) {
    return 'This action adds a new imageAssessment';
  }

  findAll() {
    return `This action returns all imageAssessment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageAssessment`;
  }

  update(id: number, updateImageAssessmentDto: UpdateImageAssessmentDto) {
    return `This action updates a #${id} imageAssessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageAssessment`;
  }
}
