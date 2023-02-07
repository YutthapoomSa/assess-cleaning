import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AssessmentDB } from './asessment.entity';
import { LineDB } from './line.entity';
import { UserDB } from './user.entity';

export class ZoneListDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    name: string;
}
export const ZoneListDBSchema = SchemaFactory.createForClass(ZoneListDB);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({ _id: true })
export class ZoneReport extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: UserDB.name,
    })
    user: MongooseSchema.Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    title: string;

    @Prop({
        type: MongooseSchema.Types.String,
    })
    detail: string;

    @Prop({
        type: MongooseSchema.Types.Array,
    })
    image: string[];

    @Prop({
        type: MongooseSchema.Types.Date,
        default: Date.now(),
    })
    createAt: Date;
}

export const ZoneReportSchema = SchemaFactory.createForClass(ZoneReport);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({
    collection: 'zone',
    _id: true,
})
export class ZoneDB extends Document {
    resData(resData: any) {
        throw new Error('Method not implemented.');
    }

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        unique: false,
    })
    name: string;

    @Prop({
        type: MongooseSchema.Types.Array,
        required: true,
        unique: false,
    })
    zoneList: string[];

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: AssessmentDB.name,
        required: false,
    })
    checkList: MongooseSchema.Types.ObjectId;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: AssessmentDB.name,
        // required: true,
        required: false,
    })
    estimate: MongooseSchema.Types.ObjectId;

    // @Prop({
    //     type: [ZoneReportSchema],
    // })
    // zoneReport: ZoneReport[];

    // ────────────────────────────────────────────────────────────────────────────────

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: LineDB.name,
    })
    line: MongooseSchema.Types.ObjectId;
}
export const ZoneSchema = SchemaFactory.createForClass(ZoneDB);
