import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from "mongoose";
import { ResStatus } from '../../../share/enum/res-status.enum';
import { ZoneDB } from './../../../entities/zone.entity';

export class CreateZoneReqDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    zoneList: string[];

    @ApiProperty()
    @IsOptional()
    checkList: string;

    @ApiProperty()
    @IsOptional()
    estimate: string;
}

class CreateZoneResDTOData {
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

export class CreateZoneResDto {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateZoneResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateZoneResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: ZoneDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateZoneResDTOData();

        if (!!datas) {
            this.resData.name = datas.name;
            this.resData.zoneList = datas.zoneList;
            this.resData.checkList = datas.checkList;
            this.resData.estimate = datas.estimate;
        }
    }
}
