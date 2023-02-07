import { forwardRef, Module } from '@nestjs/common';
import { ShareModule } from '../../share/share.module';
import { ZoneModule } from '../zone/zone.module';
import { ResultCauseController } from './result-cause.controller';
import { ResultCauseService } from './result-cause.service';

@Module({
    imports: [ShareModule, forwardRef(() => ZoneModule)],
    controllers: [ResultCauseController],
    providers: [ResultCauseService],
    exports: [ResultCauseService],
})
export class ResultCauseModule { }
