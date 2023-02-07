import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ZoneDB } from './../../../entities/zone.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class UpdateZoneDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    zoneList: string[];

    @ApiProperty()
    checkList: string;

    @ApiProperty()
    estimate: string;
}
export class UpdateZoneResDTOData {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    zoneList: string[];

    @ApiProperty()
    checkList: ObjectId;

    @ApiProperty()
    estimate: ObjectId;
}

export class UpdateZoneResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateZoneResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateZoneResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: ZoneDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateZoneResDTOData();

        if (!!datas) {
            this.resData._id = datas._id;
            this.resData.name = datas.name;
            this.resData.zoneList = datas.zoneList;
            this.resData.checkList = datas.checkList;
            this.resData.estimate = datas.estimate;
        }
    }
}
