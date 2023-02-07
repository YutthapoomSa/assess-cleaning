import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { resultAssessmentDB } from './../../../entities/resultAssement.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

// export class ImageDetail {
//     @ApiProperty()
//     @IsNotEmpty()
//     @IsNumber()
//     imageMin: number;

//     @ApiProperty()
//     @IsNotEmpty()
//     @IsNumber()
//     imageMax: number;

//     @ApiProperty()
//     @IsNotEmpty()
//     @IsBoolean()
//     imageRequire: boolean;

//     @ApiProperty()
//     @IsArray()
//     image: string[];

// }
export class CreateResultAssessmentDtoList2 {
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
    // @IsNotEmpty()
    @IsString()
    @IsArray()
    pictureId?: string[];
}

export class CreateResultAssessmentDtoList {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // imageMin: number;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // imageMax: number;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsBoolean()
    // imageRequire: boolean;

    // @ApiProperty()
    // @IsArray()
    // titlePictureId: string[];

    @ApiProperty({
        type: [CreateResultAssessmentDtoList2],
    })
    @IsNotEmpty()
    @IsArray()
    list: CreateResultAssessmentDtoList2[];
}

// ─────────────────────────────────────────────────────────────────────────────

export class CreateResultAssessmentDtoList2ResDTO {
    @ApiProperty()
    title: string;

    @ApiProperty()
    no: number;

    @ApiProperty()
    value: number;

    @ApiProperty()
    @IsArray()
    pictureId?: string[];
}

export class CreateResultAssessmentDtoListResDTO {
    @ApiProperty()
    title: string;

    @ApiProperty({
        type: [CreateResultAssessmentDtoList2ResDTO],
    })
    list: CreateResultAssessmentDtoList2ResDTO[];
}

export class CreateResultAssessmentDto {
    @ApiProperty()
    @IsString()
    userId?: string;

    @ApiProperty()
    @IsString()
    firstName?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    assessmentId: string;

    @ApiProperty()
    @IsString()
    templateName: string;

    @ApiProperty({
        type: () => [CreateResultAssessmentDtoList],
    })
    @IsArray()
    templateList: CreateResultAssessmentDtoList[];

    @ApiProperty()
    @IsString()
    assessmentDetail: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsArray()
    titlePictureId: string[]

    @ApiProperty()
    resultValue: number;
}

export class CreateResultAssessmentResDTOData {
    @ApiProperty()
    id: ObjectId;

    @ApiProperty()
    userId?: string;

    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    assessmentId: string;

    @ApiProperty({
        type: [CreateResultAssessmentDtoList],
    })
    templateList: CreateResultAssessmentDtoList[];

    @ApiProperty()
    templateName: string;

    @ApiProperty()
    assessmentDetail: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    titlePictureId: string[]

    @ApiProperty()
    resultValue: number;
}

export class CreateResultAssessmentResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [CreateResultAssessmentResDTOData],
        description: 'ข้อมูล',
    })
    resData: CreateResultAssessmentResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: resultAssessmentDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _data = new CreateResultAssessmentResDTOData();
                _data.id = iterator._id;
                _data.userId = iterator.userId ? iterator.userId : null;
                _data.firstName = iterator.firstName ? iterator.firstName : null;
                _data.assessmentId = iterator.assessmentId;
                _data.templateList = [];
                _data.templateName = iterator.templateName;
                _data.assessmentDetail = iterator.assessmentDetail;
                _data.title = iterator.title;
                _data.titlePictureId = [];
                for (const iterator2 of iterator.titlePictureId) {
                    _data.titlePictureId.push(iterator2);
                }
                _data.resultValue = iterator.resultValue;

                if (!!_data.templateList && _data.templateList.length > 0) {
                    for (const iterator2 of _data.templateList) {
                        const _templateList = new CreateResultAssessmentDtoList();
                        _templateList.title = iterator2.title;
                        _templateList.list = iterator2.list;
                        _data.templateList.push(_templateList);
                    }
                }
                this.resData.push(_data);
            }
        }
    }
}
