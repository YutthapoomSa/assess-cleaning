import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'resultAssessmentImage',
    versionKey: false,
})
export class resultAssessmentImageDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        // required: true,
    })
    resultAssessmentImage: string;
}

export const resultAssessmentImageSchema = SchemaFactory.createForClass(resultAssessmentImageDB);
