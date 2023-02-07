import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { LineUserModule } from './../line-user/line-user.module';
import { ShareModule } from './../../share/share.module';
import { AssessmentModule } from './../assessment/assessment.module';
import { ZoneModule } from './../zone/zone.module';
import { JwtStrategyService } from './auth/jwt-strategy.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { ResultAssessmentModule } from '../result-assessment/result-assessment.module';

@Module({
    // imports: [ShareModule, forwardRef(() => StatusValueModule), MongooseModule.forFeature([{ name: UserDB.name, schema: UserSchema }])],
    imports: [
        MulterModule,
        ShareModule,
        forwardRef(() => AssessmentModule),
        forwardRef(() => ZoneModule),
        forwardRef(() => LineUserModule),
        forwardRef(() => ResultAssessmentModule),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository, JwtStrategyService],
    exports: [UserService, UserRepository, JwtStrategyService],
})
export class UserModule {}
