import { ResultDB } from './result.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'imageResult',
})
export class ImageResultDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    imageName: string;

    // ────────────────────────────────────────────────────────────────────────────────

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: ResultDB.name,
    })
    result: MongooseSchema.Types.ObjectId;
}

export const ImageResultSchema = SchemaFactory.createForClass(ImageResultDB);
