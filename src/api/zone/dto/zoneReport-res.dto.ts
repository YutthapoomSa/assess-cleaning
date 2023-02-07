import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ZoneDB } from './../../../entities/zone.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { ZoneReport } from './.././../../entities/zone.entity';

class ZoneDTOResData {
    @ApiProperty()
    name: string;

    @ApiProperty()
    zoneList: string[];
}

export class ZoneResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [ZoneDTOResData],
        description: 'ข้อมูล',
    })
    resData: ZoneDTOResData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: ZoneDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new ZoneDTOResData();
                _data.name = iterator.name;
                _data.zoneList = iterator.zoneList;
                this.resData.push(_data);
            }
        }
    }
}

// ────────────────────────────────────────────────────────────────────────────────

class ZoneReportDTOResData {
    @ApiProperty()
    user: ObjectId;

    @ApiProperty()
    title: string;

    @ApiProperty()
    detail: string;

    @ApiProperty()
    image: string[];
}

export class ZoneReportResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [ZoneReportDTOResData],
        description: 'ข้อมูล',
    })
    resData: ZoneReportDTOResData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: ZoneReport[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new ZoneReportDTOResData();
                _data.user = iterator.user;
                _data.title = iterator.title;
                _data.detail = iterator.detail;
                _data.image = iterator.image;
                this.resData.push(_data);
            }
        }
    }
}
