import { PartialType } from '@nestjs/swagger';
import { CreateImageAssessmentDto } from './create-image-assessment.dto';

export class UpdateImageAssessmentDto extends PartialType(CreateImageAssessmentDto) {}
