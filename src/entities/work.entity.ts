import { ZoneDB } from './zone.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserDB } from './user.entity';

@Schema({
    collection: 'work',
})
export class WorkDB extends Document {
    @Prop({ default: Date.now })
    createdAt: Date;

    // ────────────────────────────────────────────────────────────────────────────────

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: ZoneDB.name,
    })
    zone: MongooseSchema.Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: UserDB.name,
    })
    user: MongooseSchema.Types.ObjectId;
}
export const WorkSchema = SchemaFactory.createForClass(WorkDB);
