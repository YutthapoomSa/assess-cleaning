import { ApiProperty } from '@nestjs/swagger';
import { resultAssessmentDB } from './../../../entities/resultAssement.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { CreateResultAssessmentDtoList } from './create-result-assessment.dto';

export class FindAllResultAssessmentResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty({
        type: [CreateResultAssessmentDtoList],
    })
    templateList: CreateResultAssessmentDtoList[];
    @ApiProperty()
    userId: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    assessmentId: string;
    @ApiProperty()
    assessmentDetail: string;
    @ApiProperty()
    templateName: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    resultValue: number;
}

export class FindAllResultAssessmentResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllResultAssessmentResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllResultAssessmentResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: resultAssessmentDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas) {
            for (const iterator of datas) {
                const _data = new FindAllResultAssessmentResDTOData();
                _data.id = iterator._id;
                _data.userId = iterator.userId;
                _data.firstName = iterator.firstName;
                _data.assessmentId = iterator.assessmentId;
                _data.assessmentDetail = iterator.assessmentDetail;
                _data.templateList = [];
                _data.templateName = iterator.templateName;
                _data.title = iterator.title;
                _data.resultValue = iterator.resultValue;

                if (!!_data.templateList && _data.templateList.length > 0) {
                    for (const iterator2 of _data.templateList) {
                        const _templateList = new CreateResultAssessmentDtoList();
                        _templateList.list = iterator2.list;
                        _templateList.title = iterator2.title;
                        _data.templateList.push(_templateList);
                    }
                }
                this.resData.push(_data);
            }
        }
    }
}
