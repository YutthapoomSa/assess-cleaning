import { ApiProperty } from '@nestjs/swagger';

export class uploadResultAssessmentImage {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    imageAssessment: any;
}
