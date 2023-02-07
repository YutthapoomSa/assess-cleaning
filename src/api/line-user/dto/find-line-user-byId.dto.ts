import { ApiProperty } from '@nestjs/swagger';
import { LineUserDB } from '../entities/line-user.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class FindLineUserResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userLineId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string;
}

export class FindLineUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindLineUserResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindLineUserResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: LineUserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindLineUserResDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.userLineId = datas.userLineId;
            this.resData.name = datas.name;
            this.resData.userId = datas.userId ? datas.userId : null;
        }
    }
}
