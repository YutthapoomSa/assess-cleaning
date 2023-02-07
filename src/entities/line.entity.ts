import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'line',
})
export class LineDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    lineGroupName: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    lineToken: string;

    // ────────────────────────────────────────────────────────────────────────────────


}

export const LineSchema = SchemaFactory.createForClass(LineDB);
