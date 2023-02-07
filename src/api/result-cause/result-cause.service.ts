import { Injectable } from '@nestjs/common';
import { CreateResultCauseDto } from './dto/create-result-cause.dto';
import { UpdateResultCauseDto } from './dto/update-result-cause.dto';

@Injectable()
export class ResultCauseService {
  create(createResultCauseDto: CreateResultCauseDto) {
    return 'This action adds a new resultCause';
  }

  findAll() {
    return `This action returns all resultCause`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultCause`;
  }

  update(id: number, updateResultCauseDto: UpdateResultCauseDto) {
    return `This action updates a #${id} resultCause`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultCause`;
  }
}
