import { PartialType } from '@nestjs/swagger';
import { CreateResultAssessmentDto } from './create-result-assessment.dto';

export class UpdateResultAssessmentDto extends PartialType(CreateResultAssessmentDto) {}
