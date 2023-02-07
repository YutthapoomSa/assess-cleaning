import { ApiProperty } from '@nestjs/swagger';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { AssessmentDB, EnumAssessmentType } from './../../../entities/asessment.entity';

class List {
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
class TemplateList {
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
        type: [List],
    })
    list: List[];
}

export class UpdateAssessmentDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    templateName: string;

    @ApiProperty()
    detail: string;

    @ApiProperty()
    title: string;

    @ApiProperty({
        type: [TemplateList],
    })
    templateList: TemplateList[];
}

export class UpdateAssessmentResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateAssessmentDto,
        description: 'ข้อมูล',
    })
    resData: UpdateAssessmentDto;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: AssessmentDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateAssessmentDto();
        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.templateName = datas.templateName;
            this.resData.title = datas.title;
            this.resData.detail = datas.detail;
            this.resData.templateList = [];

            if (!!datas.templateList && datas.templateList.length > 0) {
                for (const iterator of datas.templateList) {
                    const _templateList = new TemplateList();
                    _templateList.type = iterator.type;
                    _templateList.title = iterator.title;
                    _templateList.min = iterator.min;
                    _templateList.max = iterator.max;
                    _templateList.require = iterator.require;
                    _templateList.imageMin = iterator.imageMin;
                    _templateList.imageMax = iterator.imageMax;
                    _templateList.imageRequire = iterator.imageRequire;
                    _templateList.list = [];

                    if (iterator.list.length > 0) {
                        for (const iterator2 of iterator.list) {
                            const _lists = new List();
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
