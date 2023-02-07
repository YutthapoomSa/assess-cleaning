import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'task',
})
export class TaskDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
    })
    topic: string;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    lineUserId: string;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    status: string;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    replyToken: string;
}
export const TaskSchema = SchemaFactory.createForClass(TaskDB);
