import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CauseDB } from './cause.entity';
import { ZoneDB } from './zone.entity';

@Schema({
    collection: 'resultCause',
})
export class ResultCauseDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    comment: string;

    // ────────────────────────────────────────────────────────────────────────────────

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: ZoneDB.name,
    })
    zone: MongooseSchema.Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: CauseDB.name,
    })
    cause: MongooseSchema.Types.ObjectId;
}

export const ResultCauseSchema = SchemaFactory.createForClass(ResultCauseDB);
