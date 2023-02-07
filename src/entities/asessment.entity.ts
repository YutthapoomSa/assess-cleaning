import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum EnumAssessmentType {
    radio = 'radio',
    text = 'text',
    textarea = 'textArea',
    checkBox = 'checkBox',
    scroll = 'scroll',
    multiSelect = 'multiSelect',
    image = 'image',
    rankStar = 'rankStar',
}

export enum EnumTemplate {
    checkList = 'แบบตรวจสอบความสะอาด',
    estimate = 'แบบประเมินความสะอาด',
}

@Schema({ _id: false })
export class AssessmentDBTemplateList2 extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    no: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    value: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    imageMin: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    imageMax: number;

    @Prop({
        type: MongooseSchema.Types.Boolean,
        required: true,
    })
    imageRequire: boolean;
}

export const AssessmentDBTemplateList2Schema = SchemaFactory.createForClass(AssessmentDBTemplateList2);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({ _id: false })
export class AssessmentDBTemplateList extends Document {
    @Prop({
        enum: Object.keys(EnumAssessmentType).map((k) => EnumAssessmentType[k]),
        required: true,
    })
    type: EnumAssessmentType;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: false,
    })
    min: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: false,
    })
    max: number;

    @Prop({
        type: MongooseSchema.Types.Boolean,
        required: true,
    })
    require: boolean;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    imageMin: number;

    @Prop({
        type: MongooseSchema.Types.Number,
        required: true,
    })
    imageMax: number;

    @Prop({
        type: MongooseSchema.Types.Boolean,
        required: true,
    })
    imageRequire: boolean;

    @Prop({
        type: [AssessmentDBTemplateList2Schema],
        required: true,
    })
    list: AssessmentDBTemplateList2[];
}

export const AssessmentDBTemplateListSchema = SchemaFactory.createForClass(AssessmentDBTemplateList);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({
    collection: 'assessment',
})
export class AssessmentDB extends Document {
    @Prop({
        enum: Object.keys(EnumTemplate).map((k) => EnumTemplate[k]),
        required: true,
    })
    templateName: EnumTemplate;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
        allowNull: true,
        default: null,
    })
    detail: string;

    @Prop({
        type: [AssessmentDBTemplateListSchema],
    })
    templateList: AssessmentDBTemplateList[];
}
export const AssessmentSchema = SchemaFactory.createForClass(AssessmentDB);
