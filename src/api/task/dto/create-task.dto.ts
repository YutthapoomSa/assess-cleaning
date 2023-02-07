import { ApiProperty } from '@nestjs/swagger';
import { TaskDB } from './../../../entities/task.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class CreateTaskDTO {
    @ApiProperty()
    topic: string;

    @ApiProperty()
    lineUserId: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    replyToken: string;
}

export class CreateTaskResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateTaskDTO,
        description: 'ข้อมูล',
    })
    resData: CreateTaskDTO;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: TaskDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateTaskDTO();

        if (!!datas) {
            this.resData.topic = datas.topic;
            this.resData.lineUserId = datas.lineUserId;
            this.resData.status = datas.status;
            this.resData.replyToken = datas.replyToken;
        }
    }
}
