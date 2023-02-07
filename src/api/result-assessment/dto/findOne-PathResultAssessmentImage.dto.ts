import { ApiProperty } from '@nestjs/swagger';
import { resultAssessmentImageDB } from './../../../entities/resultAssessmentImage';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class findOnePathResultAssessmentImage {
    @ApiProperty()
    id: string;
}

export class findOnePathResultAssessmentImageDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => findOnePathResultAssessmentImage,
        description: 'ข้อมูล',
    })
    resData: findOnePathResultAssessmentImage;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, data: resultAssessmentImageDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new findOnePathResultAssessmentImage();

        // console.log('data IDIDID', data._id);
        if (!!data) {
            this.resData.id = data._id;
        }
    }
}
