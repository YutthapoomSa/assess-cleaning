import { forwardRef, Module } from '@nestjs/common';
import { LineUserModule } from '../line-user/line-user.module';
import { UserModule } from '../user/user.module';
import { ZoneModule } from '../zone/zone.module';
import { TaskModule } from './../task/task.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
    imports: [forwardRef(() => TaskModule), forwardRef(() => LineUserModule), forwardRef(() => UserModule),forwardRef(()=> ZoneModule)],
    controllers: [WebhookController],
    providers: [WebhookService],
    exports: [WebhookService],
})
export class WebhookModule {}
