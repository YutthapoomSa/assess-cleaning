import { ApiProperty } from '@nestjs/swagger';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { LineUserDB } from '../entities/line-user.entity';

export class FindLineUserByUserLineIdResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userLineId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string;
}

export class FindLineUserByUserLineIdResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindLineUserByUserLineIdResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindLineUserByUserLineIdResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: LineUserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindLineUserByUserLineIdResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.userLineId = datas.userLineId;
            this.resData.name = datas.name;
            this.resData.userId = datas.userId ? datas.userId : null;
        }
    }
}
