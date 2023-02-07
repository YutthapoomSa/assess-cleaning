import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageAssessmentService } from './image-assessment.service';
import { CreateImageAssessmentDto } from './dto/create-image-assessment.dto';
import { UpdateImageAssessmentDto } from './dto/update-image-assessment.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from '../../services/log.service';


@ApiTags('image-assessment')
@Controller('image-assessment')
@Controller('image-assessment')
export class ImageAssessmentController {
  private logger = new LogService(ImageAssessmentController.name);
  constructor(private readonly imageAssessmentService: ImageAssessmentService) {}

  @Post()
  create(@Body() createImageAssessmentDto: CreateImageAssessmentDto) {
    return this.imageAssessmentService.create(createImageAssessmentDto);
  }

  @Get()
  findAll() {
    return this.imageAssessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageAssessmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageAssessmentDto: UpdateImageAssessmentDto) {
    return this.imageAssessmentService.update(+id, updateImageAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageAssessmentService.remove(+id);
  }
}
