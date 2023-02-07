import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnumAssessmentType } from './../../../entities/asessment.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { AssessmentDB } from './../../../entities/asessment.entity';

export class AssessmentPaginationDTO {
    @ApiProperty({
        example: '10',
    })
    @IsNotEmpty()
    @IsNumber()
    perPages: number;

    @ApiProperty({
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        example: '',
    })
    @IsString()
    search: string;
}
// // ────────────────────────────────────────────────────────────────────────────────

export class AssessmentPaginationResDTOResDatasList2 {
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

export class AssessmentPaginationDtoList {
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
        type: [AssessmentPaginationResDTOResDatasList2],
    })
    list: AssessmentPaginationResDTOResDatasList2[];
}

export class AssessmentPaginationResDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    templateName: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    detail: string;

    @ApiProperty({
        type: [AssessmentPaginationDtoList],
    })
    templateList: AssessmentPaginationDtoList[];
}
// ─────────────────────────────────────────────────────────────────────────────

export class AssessmentPaginationResDTOResData {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty({
        type: () => [AssessmentPaginationResDto],
    })
    datas: AssessmentPaginationResDto[];
}

export class AssessmentPaginationResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => AssessmentPaginationResDTOResData,
        description: 'ข้อมูล',
    })
    resData: AssessmentPaginationResDTOResData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(
        resStatus: ResStatus,
        msg: string,
        datas: AssessmentDB[],
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number,
    ) {
        this.resCode = resStatus;
        this.msg = msg;

        const _resData = new AssessmentPaginationResDTOResData();
        _resData.itemsPerPage = itemsPerPage;
        _resData.totalItems = totalItems;
        _resData.currentPage = currentPage;
        _resData.totalPages = totalPages;
        _resData.datas = [];

        if (!!datas && datas.length > 0) {
            for (const iterator of datas) {
                const _assessmentPaginationResDto = new AssessmentPaginationResDto();
                _assessmentPaginationResDto.id = iterator.id;
                _assessmentPaginationResDto.templateName = iterator.templateName;
                _assessmentPaginationResDto.title = iterator.title;
                _assessmentPaginationResDto.detail = iterator.detail;
                _assessmentPaginationResDto.templateList = [];

                if (!!iterator.templateList && iterator.templateList.length > 0) {
                    for (const iterator2 of iterator.templateList) {
                        const _templateList = new AssessmentPaginationDtoList();
                        _templateList.type = iterator2.type;
                        _templateList.title = iterator2.title;
                        _templateList.min = iterator2.min;
                        _templateList.max = iterator2.max;
                        _templateList.require = iterator2.require;
                        _templateList.imageMin = iterator2.imageMin;
                        _templateList.imageMax = iterator2.imageMax;
                        _templateList.imageRequire = iterator2.imageRequire;
                        _templateList.list = [];

                        if (!!iterator2.list && iterator2.list.length > 0) {
                            for (const iterator3 of iterator2.list) {
                                const _lists = new AssessmentPaginationResDTOResDatasList2();
                                _lists.title = iterator3.title;
                                _lists.no = iterator3.no;
                                _lists.value = iterator3.value;
                                _lists.imageMin = iterator3.imageMin;
                                _lists.imageMax = iterator3.imageMax;
                                _lists.imageRequire = iterator3.imageRequire;
                                _templateList.list.push(_lists);
                            }
                        }

                        _assessmentPaginationResDto.templateList.push(_templateList);
                    }
                }

                _resData.datas.push(_assessmentPaginationResDto);
            }
        }
        this.resData = _resData;
    }
}
