import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserDB } from './../../../entities/user.entity';

@Schema({
    collection: 'lineUser',
    _id: true,
})
export class LineUserDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    userLineId: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    name: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: false,
        ref: UserDB.name,
    })
    userId: string;
}

export const LineUserSchema = SchemaFactory.createForClass(LineUserDB);
