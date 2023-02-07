import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class LinePaginationDTOData {
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

export class LinePaginationDTO {
    @ApiProperty()
    id: String;

    @ApiProperty()
    userLineId: String;

    @ApiProperty()
    name: String;

    @ApiProperty()
    userId: String;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    prefix: string;
}

class LinePaginationDTORes {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty({
        type: () => [LinePaginationDTO],
    })
    // datas: LinePaginationDTO[];
    datas: any[];
}

export class LinePaginationDTOResData {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => LinePaginationDTORes,
        description: 'ข้อมูล',
    })
    resData: LinePaginationDTORes;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resStatus: ResStatus, msg: string, data: any[], totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number) {
        this.resCode = resStatus;
        this.msg = msg;

        const _resData = new LinePaginationDTORes();
        _resData.itemsPerPage = itemsPerPage;
        _resData.totalItems = totalItems;
        _resData.currentPage = currentPage;
        _resData.totalPages = totalPages;
        _resData.datas = [];
        // console.log(data);

        if (!!data && data.length > 0) {
            for (const item of data) {
                const _data: any = new LinePaginationDTO();
                _data.id = item._id;
                _data.userLineId = item.userLineId;
                _data.name = item.name;
                _data.userId = item.userId ? item.userId._id : null;
                // _data.userId = !!item.userId ? item.userId : null;
                _data.firstName = item.userId?.firstName ? item.userId.firstName : null;
                _data.lastName = item.userId?.lastName ? item.userId.lastName : null;
                _data.prefix = item.userId?.prefix ? item.userId.prefix : null;
                _resData.datas.push(_data);
            }
            this.resData = _resData;
        }
    }
}
