import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { LineUserDB } from '../entities/line-user.entity';

export class UpdateLineUserReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userLineId: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // name: string;
}

export class UserDetailResData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}

export class UpdateLineUserResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userLineId: string;
    @ApiProperty()
    name: string;
    @ApiProperty({
        type: () => [UserDetailResData],
    })
    userId: UserDetailResData[];
}

export class UpdateLineUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateLineUserResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateLineUserResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: LineUserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateLineUserResDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.userLineId = datas.userLineId;
            this.resData.name = datas.name;
            this.resData.userId = [];

            if (this.resData.userId.length > 0) {
                for (const iterator2 of this.resData.userId) {
                    const _data1 = new UserDetailResData();
                    _data1.id = iterator2.id;
                    _data1.firstName = iterator2.firstName;
                    _data1.lastName = iterator2.lastName;
                    this.resData.userId.push(_data1);
                }
            }
        }
    }
}
