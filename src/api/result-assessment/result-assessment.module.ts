import { forwardRef, Module } from '@nestjs/common';
import { ResultAssessmentService } from './result-assessment.service';
import { ResultAssessmentController } from './result-assessment.controller';
import { ShareModule } from '../../share/share.module';
import { resultAssessmentRepository } from './result-assessment.repository';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { ZoneRepository } from '../zone/zone.repository';

@Module({
    imports: [ShareModule, forwardRef(() => ResultAssessmentModule), forwardRef(() => UserModule)],
    controllers: [ResultAssessmentController],
    providers: [ResultAssessmentService, resultAssessmentRepository, UserRepository, ZoneRepository],
    exports: [ResultAssessmentService, resultAssessmentRepository, UserRepository, ZoneRepository],
})
export class ResultAssessmentModule {}
