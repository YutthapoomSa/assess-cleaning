import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import path from 'path';
import { UserDB } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { User } from './../../share/decorator/user.decorator';
import { editFileName, imageFileFilter } from './../../share/utils/file-upload.utils';
import { CreateResultAssessmentDto } from './dto/create-result-assessment.dto';
import { uploadResultAssessmentImage } from './dto/upload-result-assessment.dto';
import { ResultAssessmentService } from './result-assessment.service';

@ApiTags('result-assessment')
@Controller('result-assessment')
export class ResultAssessmentController {
    private logger = new LogService(ResultAssessmentController.name);
    constructor(private readonly resultAssessmentService: ResultAssessmentService) {}

    @Post('createResultAssessment/checkList')
    @ApiOperation({ summary: 'สร้างข้อมูล ResultAssessment' })
    async createCheckList(@Body() createResultAssessmentDto: CreateResultAssessmentDto) {
        return await this.resultAssessmentService.create(createResultAssessmentDto);
    }

    @Post('createResultAssessment/estimate')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'สร้างข้อมูล ResultAssessment' })
    // @ApiOperation({ summary: 'เพิ่มรูปภาพ' })
    async createEstimate(
        // @UploadedFiles() imageAssessment: Express.Multer.File[],
        // @Param('userId') userId: string,
        // @Param('estimateId') estimateId: string,
        @Body()
        createResultAssessmentDto: CreateResultAssessmentDto,
        // CreateAssessmentImage: CreateAssessmentImage,
    ) {
        // return await this.resultAssessmentService.create(imageAssessment, CreateAssessmentImage, createResultAssessmentDto);
        return await this.resultAssessmentService.create(createResultAssessmentDto);
    }

    @Get('findAllResultAssessment')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'FindAll ResultAssessment' })
    async findAll(@User() user: UserDB) {
        return await this.resultAssessmentService.findAll();
    }

    @Get('findOneResultAssessmentById/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: string) {
        return await this.resultAssessmentService.findOne(id);
    }

    @Get('findAllResultAssessment/findAllImageResultAssessmentPath')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'FindAll ImageResultAssessmentPath' })
    async findAllImagePath(@User() user: UserDB) {
        return await this.resultAssessmentService.findAllImagePath();
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateResultAssessmentDto: UpdateResultAssessmentDto) {
    //     return this.resultAssessmentService.update(+id, updateResultAssessmentDto);
    // }

    @Get('isFinishResultAssessment/:resultAssessmentId')
    async isFinishResultAssessment(@Param('resultAssessmentId') resultAssessmentId: string) {
        return await this.resultAssessmentService.isFinishResultAssessment(resultAssessmentId);
    }

    @Delete('deleteAllResultAssessment')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async remove(@User() user: UserDB) {
        return await this.resultAssessmentService.remove();
    }

    @Post('upload-image')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'เพิ่มรูปภาพ ' })
    @UseInterceptors(
        FilesInterceptor('imageAssessment', 1, {
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            storage: diskStorage({
                destination: `${path.resolve(__dirname, '..', '..', '..', 'upload', 'imageAssessment')}`,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    // / Todo ? maybe this must be fix but now 15.50 19/10/65 i'm so fucking sleepy and headache lol
    async uploadResultAssessmentImage(
        // @User() user: UserDB,
        @UploadedFiles() imageAssessment: Express.Multer.File[],
        @Body() uploadResultAssessmentImage: uploadResultAssessmentImage,
        // CreateAssessmentImage: CreateAssessmentImage,
    ) {
        // console.log('controller');

        // return await this.resultAssessmentService.create(imageAssessment, CreateAssessmentImage, createResultAssessmentDto);
        return await this.resultAssessmentService.uploadResultAssessmentImage(imageAssessment, uploadResultAssessmentImage);
    }

    @Get('findPictureById/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async findPictureById(@User() user: UserDB, @Param('id') id: string) {
        return await this.resultAssessmentService.findPictureById(id);
    }
}
