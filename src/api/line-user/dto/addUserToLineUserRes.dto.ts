import { ApiProperty } from "@nestjs/swagger";
import { EnumAssessmentType } from "./../../../entities/asessment.entity";
import { ResStatus } from "./../../../share/enum/res-status.enum";


export class AddUserToLineUserDTORes {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => null,
        description: 'ข้อมูล',
    })
    resData: null;

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