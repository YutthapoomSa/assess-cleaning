import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class DeleteZoneReqDTO {
    @ApiProperty()
    @IsString()
    @IsString()
    zoneId: string;
}

export class DeleteZoneResDTOData {
    @ApiProperty()
    zoneId: string;
}

export class DeleteZoneResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => DeleteZoneResDTOData,
        description: 'ข้อมูล',
    })
    resData: DeleteZoneResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = null;
    }
}
