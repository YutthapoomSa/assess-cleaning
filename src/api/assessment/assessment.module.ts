import { forwardRef, Module } from '@nestjs/common';
import { ShareModule } from '../../share/share.module';
import { AssessmentController } from './assessment.controller';
import { AssessmentRepository } from './assessment.repository';
import { AssessmentService } from './assessment.service';

@Module({
    imports: [ShareModule, forwardRef(() => AssessmentModule)],
    controllers: [AssessmentController],
    providers: [AssessmentService, AssessmentRepository],
    exports: [AssessmentService, AssessmentRepository],
})
export class AssessmentModule {}
