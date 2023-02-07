import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AssessmentDB } from './asessment.entity';
import { UserDB } from './user.entity';

@Schema()
export class resultAssessmentDBTemplateList2 extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: false,
    })
    no: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: false,
    })
    value: number;

    @Prop({
        type: MongooseSchema.Types.Array,
        required: false,
    })
    imageAssessment: string[];
}

export const resultAssessmentDBTemplateList2Schema = SchemaFactory.createForClass(resultAssessmentDBTemplateList2);

@Schema()
export class resultAssessmentDBTemplateList extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    title: string;

    @Prop({
        type: [resultAssessmentDBTemplateList2Schema],
        required: false,
    })
    list: resultAssessmentDBTemplateList2[];
}

export const resultAssessmentDBTemplateListSchema = SchemaFactory.createForClass(resultAssessmentDBTemplateList);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({
    collection: 'resultAssessment',
})
export class resultAssessmentDB extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: UserDB.name,
        // required: false,
        // allowNull : true,
        // unique: false,
    })
    userId: string;

    @Prop({
        type: MongooseSchema.Types.String,
        // required: true,
        // allowNull : true,
    })
    firstName: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: AssessmentDB.name,
        required: true,
    })
    assessmentId: string;

    @Prop({
        type: [resultAssessmentDBTemplateListSchema],
        // required: true,
    })
    templateList: resultAssessmentDBTemplateList[];

    @Prop({
        type: MongooseSchema.Types.String,
        // required: true,
    })
    templateName: string;

    @Prop({
        type: MongooseSchema.Types.String,
        // required: true,
    })
    assessmentDetail: string;

    @Prop({
        type: MongooseSchema.Types.String,
        // required: true,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.Array,
        required: false,
    })
    titlePictureId: string[];

    @Prop({
        type: MongooseSchema.Types.Number,
        // required: true,
    })
    resultValue: number;
}
export const resultAssessmentSchema = SchemaFactory.createForClass(resultAssessmentDB);
