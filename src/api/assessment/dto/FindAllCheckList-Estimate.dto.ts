import { ApiProperty } from '@nestjs/swagger';
import { AssessmentDB } from './../../../entities/asessment.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class findAllCheckListAndEstimateDataDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    templateName: string;
    @ApiProperty()
    title: string;
}
export class findAllCheckListAndEstimateDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [findAllCheckListAndEstimateDataDTO],
        description: 'ข้อมูล',
    })
    resData: findAllCheckListAndEstimateDataDTO[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: AssessmentDB[], isCheckList?: boolean) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas) {
            for (const iterator of datas) {
                const _data = new findAllCheckListAndEstimateDataDTO();
                _data.id = iterator.id;
                _data.templateName = iterator.templateName;
                _data.title = iterator.title;
                this.resData.push(_data);
            }
        }
    }
}
