import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'cause',
})
export class CauseDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    name: string;

    // ────────────────────────────────────────────────────────────────────────────────
}

export const CauseSchema = SchemaFactory.createForClass(CauseDB);
