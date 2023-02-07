import { forwardRef, Module } from '@nestjs/common';
import { LineUserService } from './line-user.service';
import { LineUserController } from './line-user.controller';
import { ShareModule } from '../../share/share.module';

@Module({
    imports: [ShareModule, forwardRef(() => LineUserModule)],
    controllers: [LineUserController],
    providers: [LineUserService],
    exports: [LineUserService],
})
export class LineUserModule {}
