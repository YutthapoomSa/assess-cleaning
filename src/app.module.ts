import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './services/log.service';
import { ShareModule } from './share/share.module';
import { AssessmentModule } from './api/assessment/assessment.module';
import { ImageAssessmentModule } from './api/image-assessment/image-assessment.module';
import { LineUserModule } from './api/line-user/line-user.module';
import { ResultAssessmentModule } from './api/result-assessment/result-assessment.module';
import { TaskModule } from './api/task/task.module';
import { UserModule } from './api/user/user.module';
import { WebhookModule } from './api/webhook/webhook.module';
import { ZoneRepository } from './api/zone/zone.repository';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';


@Module({
    imports: [
        ShareModule,
        ConfigModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
        }),
        UserModule,
        AssessmentModule,
        WebhookModule,
        TaskModule,
        ResultAssessmentModule,
        ImageAssessmentModule,
        LineUserModule,
        
    ],
    controllers: [],
    providers: [LogService, ZoneRepository],
})
export class AppModule {}
