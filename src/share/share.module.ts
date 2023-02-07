import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { LineUserDB, LineUserSchema } from './../api/line-user/entities/line-user.entity';
import { AssessmentDB, AssessmentSchema } from './../entities/asessment.entity';
import { CauseDB, CauseSchema } from './../entities/cause.entity';
import { ImageResultDB, ImageResultSchema } from './../entities/image-result.entity';
import { LineDB, LineSchema } from './../entities/line.entity';
import { ResultCauseDB, ResultCauseSchema } from './../entities/result-cause.entity';
import { ResultDB, ResultSchema } from './../entities/result.entity';
import {
    resultAssessmentDB,
    resultAssessmentDBTemplateList,
    resultAssessmentDBTemplateList2,
    resultAssessmentDBTemplateList2Schema,
    resultAssessmentDBTemplateListSchema,
    resultAssessmentSchema,
} from './../entities/resultAssement.entity';
import { resultAssessmentImageDB, resultAssessmentImageSchema } from './../entities/resultAssessmentImage';
import { WorkDB, WorkSchema } from './../entities/work.entity';
import { ZoneDB, ZoneReport, ZoneSchema } from './../entities/zone.entity';
import { ThirdPartyLineService } from './../services/third-party-line.service';
import { ConfigService } from './../config/config.service';
import {
    AssessmentDBTemplateList,
    AssessmentDBTemplateList2,
    AssessmentDBTemplateList2Schema,
    AssessmentDBTemplateListSchema,
} from './../entities/asessment.entity';
import { TaskDB, TaskSchema } from './../entities/task.entity';
import { UserDB, UserDBWork, UserDBWorkSchema, UserSchema } from './../entities/user.entity';
import { ZoneReportSchema } from './../entities/zone.entity';
import { EncryptionService } from './../services/encryption.service';
import { FlexMassageTemplateNo1Service } from './../services/flex-massage-template-no1.service';
import { PaginationService } from './../services/pagination.service';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserDB.name,
                schema: UserSchema,
                discriminators: [{ name: UserDBWork.name, schema: UserDBWorkSchema }],
            },
            { name: ZoneDB.name, schema: ZoneSchema, discriminators: [{ name: ZoneReport.name, schema: ZoneReportSchema }] },
            { name: WorkDB.name, schema: WorkSchema },
            { name: ResultCauseDB.name, schema: ResultCauseSchema },
            { name: ResultDB.name, schema: ResultSchema },
            { name: LineDB.name, schema: LineSchema },
            { name: LineUserDB.name, schema: LineUserSchema },
            { name: ImageResultDB.name, schema: ImageResultSchema },
            {
                name: AssessmentDB.name,
                schema: AssessmentSchema,
                discriminators: [
                    { name: AssessmentDBTemplateList.name, schema: AssessmentDBTemplateListSchema },
                    { name: AssessmentDBTemplateList2.name, schema: AssessmentDBTemplateList2Schema },
                ],
            },
            {
                name: resultAssessmentImageDB.name,
                schema: resultAssessmentImageSchema,
            },
            {
                name: resultAssessmentDB.name,
                schema: resultAssessmentSchema,
            },
            { name: resultAssessmentDBTemplateList.name, schema: resultAssessmentDBTemplateListSchema },
            { name: resultAssessmentDBTemplateList2.name, schema: resultAssessmentDBTemplateList2Schema },

            { name: CauseDB.name, schema: CauseSchema },
            { name: TaskDB.name, schema: TaskSchema },
        ]),

        HttpModule.register({
            timeout: 60000,
        }),
    ],
    providers: [EncryptionService, ConfigService, ThirdPartyLineService, FlexMassageTemplateNo1Service, PaginationService, MulterModule],
    exports: [
        EncryptionService,
        ConfigService,
        MongooseModule,
        HttpModule,
        ThirdPartyLineService,
        FlexMassageTemplateNo1Service,
        PaginationService,
        MulterModule,
    ],
})
export class ShareModule {}
