import { PartialType } from '@nestjs/mapped-types';
import { CreateResultCauseDto } from './create-result-cause.dto';

export class UpdateResultCauseDto extends PartialType(CreateResultCauseDto) {}
