import { Module } from '@nestjs/common';
import { ShareModule } from '../../share/share.module';
import { LineController } from './line.controller';
import { LineService } from './line.service';

@Module({
    imports: [ShareModule],
    controllers: [LineController],
    providers: [LineService],
    exports: [LineService],
})
export class LineModule {}
