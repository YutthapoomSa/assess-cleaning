import { ApiProperty } from "@nestjs/swagger";
import { EnumAssessmentType } from "./../../../entities/asessment.entity";
import { ResStatus } from "./../../../share/enum/res-status.enum";

export class DeleteAssessmentDTOList2{
    @ApiProperty()
    title: string;
    @ApiProperty()
    no: number;
    @ApiProperty()
    value: number;
    @ApiProperty()
    imageMin: number;
    @ApiProperty()
    imageMax: number;
    @ApiProperty()
    imageRequire: boolean;
}

export class DeleteAssessmentDTOList{
    @ApiProperty({
        enum: Object.keys(EnumAssessmentType).map((k) => EnumAssessmentType[k]),
    })
    type: EnumAssessmentType;
    @ApiProperty()
    title: string;
    @ApiProperty()
    min: number;
    @ApiProperty()
    max: number;
    @ApiProperty()
    require: boolean;
    @ApiProperty()
    imageMin: number;

    @ApiProperty()
    imageMax: number;

    @ApiProperty()
    imageRequire: boolean;
    @ApiProperty({
        type: [DeleteAssessmentDTOList2],
    })
    list: DeleteAssessmentDTOList2[];
}

export class DeleteAssessmentDTO{
    @ApiProperty()
    templateName: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    detail: string;
    @ApiProperty({
        type: [DeleteAssessmentDTOList]
    })
    templateList: DeleteAssessmentDTOList[];
}

export class DeleteAssessmentResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => DeleteAssessmentDTO,
        description: 'ข้อมูล',
    })
    resData: DeleteAssessmentDTO;

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