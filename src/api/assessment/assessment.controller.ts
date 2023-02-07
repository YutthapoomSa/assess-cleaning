import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from '../../entities/user.entity';
import { LogService } from '../../services/log.service';
import { User } from '../../share/decorator/user.decorator';
import { AssessmentRepository } from './assessment.repository';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { DeleteAssessmentResDTO } from './dto/delete-assessment.dto';
import { FindOneAssessmentDTO } from './dto/findOne-assessment.dto';
import { AssessmentPaginationDTO, AssessmentPaginationResDTO } from './dto/pagination-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
// import { CreateAssessmentImage } from './dto/create-assessment-image.dto';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
    private logger = new LogService(AssessmentController.name);
    constructor(private readonly assessmentService: AssessmentService, private readonly AssessmentRepository: AssessmentRepository) {}

    @Post('createAssessment')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'สร้างข้อมูล Assessment' })
    @ApiOkResponse({ type: FindOneAssessmentDTO })
    async CreateAssessment(@User() user: UserDB, @Body() createAssessmentDto: CreateAssessmentDto) {
        return await this.assessmentService.createAssessment(user.id, createAssessmentDto);
    }

    @Get('findAssessmentTemplateById/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'แสดงข้อมูล Assessment โดยการ Find id' })
    @ApiOkResponse({ type: FindOneAssessmentDTO })
    async findOne(@User() user: UserDB, @Param('id') id: string) {
        return await this.assessmentService.findOne(id);
    }

    @Get('findAllAssessment')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'FindAll Assessment' })
    async findAll(@User() user: UserDB) {
        return await this.assessmentService.findAll();
    }

    @Get('findAllCheckList')
    @ApiOperation({ summary: 'FindAll Check List' })
    async findAllCheckList(){
        return await this.assessmentService.findAllCheckList();
    }

    @Get('findAllEstimate')
    @ApiOperation({ summary: 'FindAll Estimate' })
    async findAllEstimate(){
        return await this.assessmentService.findAllEstimate();
    }

    @Patch('updateAssessmentTemplate')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'อัพเดทข้อมูล Assessment' })
    @ApiOkResponse({ type: FindOneAssessmentDTO })
    async updateAssessmentTemplate(@Body() body: UpdateAssessmentDto) {
        return this.assessmentService.update(body);
    }

    @Delete('deleteAssessment/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: DeleteAssessmentResDTO })
    async deleteZone(@Param('id') id: string) {
        return this.assessmentService.deleteAssessmentById(id);
    }

    @Post('paginationAssessmentTemplate')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: AssessmentPaginationResDTO })
    @ApiOperation({ summary: 'pagination assessment' })
    paginationDocument(@Body() paginationDTO: AssessmentPaginationDTO) {
        return this.AssessmentRepository.assessmentPagination(paginationDTO);
    }

    // @Post('uploads-image/:assessmentId')
    // @ApiConsumes('multipart/form-data')
    // @ApiOperation({ summary: 'เพิ่มรูปภาพ' })
    // @UseInterceptors(
    //     FilesInterceptor('image', 1, {
    //         limits: {
    //             fileSize: 5 * 1024 * 1024,
    //         },
    //         storage: diskStorage({
    //             destination: `${path.resolve(__dirname, '..', '..', '..', 'upload', 'imageAssessment')}`,
    //             filename: editFileName,
    //         }),
    //         fileFilter: imageFileFilter,
    //     }),
    // )
    // uploadUserImage(
    //     @UploadedFiles() image: Express.Multer.File[],
    //     @Body() body: CreateAssessmentImage,
    //     @Param('assessmentId') id: string,
    // ) {
    //     return this.AssessmentRepository.uploadAssessmentImage(image, id);
    // }

    //     @Post('upload-image')
    //     @ApiConsumes('multipart/form-data')
    //     @ApiOperation({ summary: 'เพิ่มรูปภาพ' })
    //     @UseInterceptors(
    //         FilesInterceptor('imageAssessment', 10, {
    //             limits: {
    //                 fileSize: 5 * 1024 * 1024,
    //             },
    //             storage: diskStorage({
    //                 destination: `${path.resolve(__dirname, '..', '..', '..', 'upload', 'imageAssessment')}`,
    //                 filename: editFileName,
    //             }),
    //             fileFilter: imageFileFilter,
    //         }),
    //     )
    //     // @ApiBearerAuth()
    //     // @UseGuards(AuthGuard('jwt'))
    //     uploadAssessmentImage(
    //         @UploadedFiles() imageAssessment: Express.Multer.File[],
    //         @Body() body: CreateAssessmentImage,

    //         // @User() user: UserDB,
    //     ) {
    //         // this.logger.debug('user -> ', user);
    //         // return this.AssessmentRepository.uploadAssessmentImage(imageAssessment, user.id, body);
    //         return this.AssessmentRepository.uploadAssessmentImage(imageAssessment, body);
    //     }
}
