import { forwardRef, Module } from '@nestjs/common';
import { ShareModule } from '../../share/share.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { AssessmentRepository } from '../assessment/assessment.repository';
import { AssessmentService } from '../assessment/assessment.service';
import { ZoneController } from './zone.controller';
import { ZoneRepository } from './zone.repository';
import { ZoneService } from './zone.service';

@Module({
    imports: [ShareModule, forwardRef(() => AssessmentModule)],
    controllers: [ZoneController],
    providers: [ZoneService, ZoneRepository, AssessmentRepository, AssessmentService],
    exports: [ZoneService, ZoneRepository, AssessmentRepository, AssessmentService],
})
export class ZoneModule {}
