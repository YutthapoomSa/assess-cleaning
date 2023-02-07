import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ZoneDB } from './../../../entities/zone.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class FindAllZoneReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class FindAllZoneResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}

export class FindAllZoneResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllZoneResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllZoneResDTOData[];

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
                const _data = new FindAllZoneResDTOData();
                _data.id = iterator.id;
                _data.name = iterator.name;

                this.resData.push(_data);
            }
        }
    }
}
