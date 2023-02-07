import { ApiProperty } from '@nestjs/swagger';
import console from 'console';
import { AssessmentPaginationResDto } from './../../../api/assessment/dto/pagination-assessment.dto';
import { ZoneDB } from './../../../entities/zone.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class zoneListDTOData {
    @ApiProperty()
    name: string[];
}
// ─────────────────────────────────────────────────────────────────────────────
export class CreateZoneResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        // type: zoneListDTOData,
    })
    zoneList: string[];

    @ApiProperty({
        // type: [AssessmentPaginationResDto],
    })
    // checkList: AssessmentPaginationResDto[];
    // checkList: any[];
    checkList: string;

    @ApiProperty({
        // type: [AssessmentPaginationResDto],
    })
    // estimate: AssessmentPaginationResDto[];
    estimate: string;
    // estimate: any[];
}

export class ZoneResultResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateZoneResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateZoneResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;
    constructor(resCode: ResStatus, msg: string, datas: any) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateZoneResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.name = datas.name;
            this.resData.zoneList = [];
            this.resData.checkList = null;
            this.resData.estimate = null;
            console.log('dtozonebyid', JSON.stringify(datas, null, 2));

            if (!!datas.zoneList && datas.zoneList.length > 0) {
                // const _index2 = new zoneListDTOData();
                for (const iterator2 of datas.zoneList) {
                    // console.log(iterator2);
                    // _index2.name = iterator2;
                    this.resData.zoneList.push(iterator2);
                }
            }

            if (!!datas.checkList) {
                // console.log(JSON.stringify)
                this.resData.checkList = datas.checkList._id;
                // const _index3 = new AssessmentPaginationResDto();
                // _index3.id = datas.checkList._id;
                // _index3.title = datas.checkList.title;
                // _index3.detail = datas.checkList.detail;
                // _index3.templateName = datas.checkList.templateName;
                // _index3.templateList = [];
                // for (const iterator of datas.checkList.templateList) {
                //     _index3.templateList.push(iterator);
                // }
                // this.resData.checkList.push(_index3);

                if (!!datas.estimate) {
                    this.resData.estimate = datas.estimate._id;
                    // const _index4 = new AssessmentPaginationResDto();
                    // _index4.id = datas.estimate._id;
                    // _index4.title = datas.estimate.title;
                    // _index4.detail = datas.estimate.detail;
                    // _index4.templateName = datas.estimate.templateName;
                    // _index4.templateList = [];
                    // for (const iterator of datas.estimate.templateList) {
                    //     _index4.templateList.push(iterator);
                    // }
                    // this.resData.estimate.push(_index4);
                    // console.log('estimate -> ', _index4);

                    // this.resData.checkList.push(_index3);
                    // console.log('estimate -> ', _index3);
                }
            }

            // console.log('this.resData', this.resData);
        }
    }
}
