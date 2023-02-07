import { ApiProperty } from '@nestjs/swagger';

class Message {
    type: string;
    id: string;
    text: string;
}

class Source {
    type: string;
    groupId: string;
    userId: string;
}

class Event {
    @ApiProperty()
    type: string;
    @ApiProperty()
    message: Message;
    @ApiProperty()
    joined : any[]
    @ApiProperty()
    contentProvider: any[];
    @ApiProperty()
    webhookEventId: string;
    @ApiProperty()
    deliveryContext: any[];
    @ApiProperty()
    timestamp: number;
    @ApiProperty()
    source: Source;
    @ApiProperty()
    replyToken: string;
    @ApiProperty()
    mode: string;
}

export class CreateWebhookDto {
    @ApiProperty()
    destination: string;
    @ApiProperty()
    events: Event[];
}
