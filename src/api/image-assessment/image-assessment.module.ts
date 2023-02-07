import {forwardRef, Module } from '@nestjs/common';
import { ImageAssessmentService } from './image-assessment.service';
import { ImageAssessmentController } from './image-assessment.controller';
import { ShareModule } from '../../share/share.module';

@Module({
  imports: [ShareModule, forwardRef(() => ImageAssessmentModule)],
  controllers: [ImageAssessmentController],
  providers: [ImageAssessmentService],
  exports:[ImageAssessmentService],
})
export class ImageAssessmentModule {}
