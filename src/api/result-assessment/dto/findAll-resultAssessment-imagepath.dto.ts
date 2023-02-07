import { ApiProperty } from '@nestjs/swagger';
import { resultAssessmentImageDB } from './../../../entities/resultAssessmentImage';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class findAllResultAssessmentImagePath {
    @ApiProperty()
    id: string;

    @ApiProperty()
    resultAssessmentImage: string;
}

export class findAllResultAssessmentImagePathDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [findAllResultAssessmentImagePath],
        description: 'ข้อมูล',
    })
    resData: findAllResultAssessmentImagePath[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, data: resultAssessmentImageDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!data) {
            for (const iterator of data) {
                const _data = new findAllResultAssessmentImagePath();
                _data.id = iterator._id;
                _data.resultAssessmentImage = iterator.resultAssessmentImage;
                this.resData.push(_data);
            }
        }
    }
}
