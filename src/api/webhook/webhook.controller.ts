import { Response } from 'express';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('webhook connect to line application :(')
@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    async create(@Body() body: CreateWebhookDto) {
        return this.webhookService.connectWebhook(body);
    }
}
