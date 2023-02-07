import { forwardRef, Module } from '@nestjs/common';
import { ShareModule } from '../../share/share.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { ZoneModule } from '../zone/zone.module';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
    imports: [ShareModule, forwardRef(() => AssessmentModule), forwardRef(() => ZoneModule)],
    controllers: [ResultController],
    providers: [ResultService],
    exports: [ResultService],
})
export class ResultModule { }
