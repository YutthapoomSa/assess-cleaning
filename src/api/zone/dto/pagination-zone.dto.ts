import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ZoneDB } from './../../../entities/zone.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class ZonePaginationDTO {
    @ApiProperty({
        example: '10',
    })
    @IsNotEmpty()
    @IsNumber()
    perPages: number;

    @ApiProperty({
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        example: '',
    })
    @IsString()
    search: string;
}
// // ────────────────────────────────────────────────────────────────────────────────

export class ZonePaginationResDTOResDatas {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    zoneList: string[];
}

class ZonePaginationResDTOResData {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty({
        type: () => [ZonePaginationResDTOResDatas],
    })
    datas: ZonePaginationResDTOResDatas[];
}

export class ZonePaginationResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => ZonePaginationResDTOResData,
        description: 'ข้อมูล',
    })
    resData: ZonePaginationResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(
        resStatus: ResStatus,
        msg: string,
        data: ZoneDB[],
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number,
    ) {
        this.resCode = resStatus;
        this.msg = msg;

        const _resData = new ZonePaginationResDTOResData();
        _resData.itemsPerPage = itemsPerPage;
        _resData.totalItems = totalItems;
        _resData.currentPage = currentPage;
        _resData.totalPages = totalPages;
        _resData.datas = [];

        if (!!data && data.length > 0) {
            for (const item of data) {
                const _data = new ZonePaginationResDTOResDatas();
                _data.id = item.id;
                _data.name = item.name;
                _data.zoneList = item.zoneList;
                _resData.datas.push(_data);
            }
            this.resData = _resData;
        }
    }
}
