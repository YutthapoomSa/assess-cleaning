import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CauseDB } from './cause.entity';
import { ZoneDB } from './zone.entity';

@Schema({
    collection: 'result',
})
export class ResultDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
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

export const ResultSchema = SchemaFactory.createForClass(ResultDB);
