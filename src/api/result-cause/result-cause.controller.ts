import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResultCauseService } from './result-cause.service';
import { CreateResultCauseDto } from './dto/create-result-cause.dto';
import { UpdateResultCauseDto } from './dto/update-result-cause.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('result-cause')
@Controller('result-cause')
export class ResultCauseController {
  constructor(private readonly resultCauseService: ResultCauseService) {}

  @Post()
  create(@Body() createResultCauseDto: CreateResultCauseDto) {
    return this.resultCauseService.create(createResultCauseDto);
  }

  @Get()
  findAll() {
    return this.resultCauseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultCauseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultCauseDto: UpdateResultCauseDto) {
    return this.resultCauseService.update(+id, updateResultCauseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultCauseService.remove(+id);
  }
}
