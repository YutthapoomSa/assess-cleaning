import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssessmentDB, EnumAssessmentType, EnumTemplate } from './../../../entities/asessment.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class CreateAssessmentDtoList2 {
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
    @IsNumber()
    imageMin: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    imageMax: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    imageRequire: boolean;
}
// ─────────────────────────────────────────────────────────────────────────────
export class CreateAssessmentDtoList {
    @ApiProperty({
        enum: Object.keys(EnumAssessmentType).map((k) => EnumAssessmentType[k]),
    })
    @IsNotEmpty()
    @IsString()
    type: EnumAssessmentType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    min: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    max: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    require: boolean;

    @ApiProperty()
    imageMin: number;

    @ApiProperty()
    imageMax: number;

    @ApiProperty()
    imageRequire: boolean;


    @ApiProperty({
        type: [CreateAssessmentDtoList2],
    })
    @IsNotEmpty()
    @IsArray()
    list: CreateAssessmentDtoList2[];
}
// ──────────────────────────────────────────────────────────────
export class CreateAssessmentDto {
    @ApiProperty({
        enum: Object.keys(EnumTemplate).map((k) => EnumTemplate[k]),
    })
    @IsNotEmpty()
    @IsString()
    templateName: EnumTemplate;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    detail?: string;

    @ApiProperty({
        type: [CreateAssessmentDtoList],
    })
    @IsNotEmpty()
    @IsArray()
    templateList: CreateAssessmentDtoList[];
}

export class CreateAssessmentDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateAssessmentDto,
        description: 'ข้อมูล',
    })
    resData: CreateAssessmentDto;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: AssessmentDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateAssessmentDto();

        if (!!datas) {
            this.resData.templateName = datas.templateName;
            this.resData.title = datas.title;
            this.resData.detail = datas.detail ? datas.detail : null;
            this.resData.templateList = [];

            if (!!datas.templateList && datas.templateList.length > 0) {
                for (const iterator of datas.templateList) {
                    const _templateList = new CreateAssessmentDtoList();
                    _templateList.type = iterator.type;
                    _templateList.title = iterator.title;
                    _templateList.min = iterator.min;
                    _templateList.max = iterator.max;
                    _templateList.require = iterator.require;
                    _templateList.imageMax = iterator.imageMax;
                    _templateList.imageMin = iterator.imageMin;
                    _templateList.imageRequire = iterator.imageRequire;
                    _templateList.list = [];

                    if (iterator.list.length > 0) {
                        for (const iterator2 of iterator.list) {
                            const _lists = new CreateAssessmentDtoList2();
                            _lists.title = iterator2.title;
                            _lists.no = iterator2.no;
                            _lists.value = iterator2.value;
                            _lists.imageMin = iterator2.imageMin;
                            _lists.imageMax = iterator2.imageMax;
                            _lists.imageRequire = iterator2.imageRequire;
                            _templateList.list.push(_lists);
                        }
                    }
                    this.resData.templateList.push(_templateList);
                }
            }
        }
    }
}
