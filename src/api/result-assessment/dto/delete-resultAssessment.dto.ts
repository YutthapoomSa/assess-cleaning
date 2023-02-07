import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class DeleteResultAssessmentDtoList2 {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    no: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    value: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pictureId?: string;
}

export class DeleteResultAssessmentDtoList {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: [DeleteResultAssessmentDtoList2],
    })
    @IsNotEmpty()
    @IsArray()
    list: DeleteResultAssessmentDtoList2[];
}

export class DeleteResultAssessmentDtoList2ResDTO {
    @ApiProperty()
    title: string;

    @ApiProperty()
    no: number;

    @ApiProperty()
    value: number;

    @ApiProperty()
    pictureId?: string;
}

export class DeleteResultAssessmentDtoListResDTOData {
    @ApiProperty()
    title: string;
    @ApiProperty()
    list: DeleteResultAssessmentDtoList2ResDTO[];
}

export class DeleteResultAssessmentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    firstName: String;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    assessmentId: string;

    @ApiProperty()
    @IsString()
    templateName: string;

    @ApiProperty()
    @IsArray()
    templateList: DeleteResultAssessmentDtoList[];

    @ApiProperty()
    @IsString()
    assessmentDetail: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    resultValue: number;
}

export class DeleteResultAssessmentResDTOData {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    userId: ObjectId;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    assessmentId: ObjectId;

    @ApiProperty({
        type: [DeleteResultAssessmentDtoListResDTOData],
    })
    templateList: DeleteResultAssessmentDtoListResDTOData[];

    @ApiProperty()
    templateName: string;

    @ApiProperty()
    assessmentDetail: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    resultValue: Number;
}

export class DeleteResultAssessmentResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => DeleteResultAssessmentResDTOData,
        description: 'ข้อมูล',
    })
    resData: DeleteResultAssessmentResDTOData;

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
