import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { LineUserDB } from '../entities/line-user.entity';

export class FindOneLineUserResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userLineId: String;
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string;
}

export class FindOneLineUserDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneLineUserResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneLineUserResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: LineUserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneLineUserResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.userLineId = datas.userLineId;
            this.resData.userId = datas.userId ? datas.userId : null;
        }
    }
}
