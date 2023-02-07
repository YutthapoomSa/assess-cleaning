import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from './../../../config/config.service';
import { resultAssessmentImageDB } from './../../../entities/resultAssessmentImage';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class findOneImageResultAssessmentPathResDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    resultAssessmentImage: string;
}

export class findOneImageResultAssessmentPathDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => findOneImageResultAssessmentPathResDTO,
        description: 'ข้อมูล',
    })
    resData: findOneImageResultAssessmentPathResDTO;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, data: resultAssessmentImageDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new findOneImageResultAssessmentPathResDTO();
        const config = new ConfigService();

        console.log('data', JSON.stringify(data, null, 2));

        if (!!data) {
            this.resData.id = data._id;
            this.resData.resultAssessmentImage = data.resultAssessmentImage
                ? config.imagePath().resultAssessmentImagePath + '/' + data.resultAssessmentImage
                : '';
        }
    }
}
