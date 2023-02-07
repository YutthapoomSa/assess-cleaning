import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { LineUserDB } from '../entities/line-user.entity';

export class CreateLineUserReqDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    userLineId: string;
}

export class CreateLineUserResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    userLineId: string;
}

export class CreateLineUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateLineUserResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateLineUserResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: LineUserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateLineUserResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.userId = datas.userId ? datas.userId : null;
            this.resData.userLineId = datas.userLineId;
        }
    }
}
