import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import moment from 'moment-timezone';
import { diskStorage } from 'multer';
import path from 'path';
import { editFileName, imageFileFilter } from './../../share/utils/file-upload.utils';
import { UserDB } from './../../entities/user.entity';
import { User } from './../../share/decorator/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateWorkListReqDTO, CreateWorkListResDTO } from './dto/createWorkList';
import { FindOneWorkListDTO } from './dto/find-one-work-list.dto';
import { LoginDTO } from './dto/login.dto';
import { UserPaginationDTO, UserPaginationResDTO } from './dto/pagination-user.dto';
import { UpdateWorkListReqDTO } from './dto/update-work-list.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

import { LogService } from './../../services/log.service';
import { CreateUserImage } from './dto/create-user-image.dto';
import { LoginUserResDTO } from './dto/login-user.dto';
import { WorkListPaginationDTO } from './dto/pagination-workList.dto';
import { ResDeleteWorkListDto } from './dto/res-delete-worklist.dto';
import { UpdateUserReqDto } from './dto/updateUser.dto';
moment.tz.setDefault('Asia/Bangkok');

@ApiTags('user')
@Controller('user')
export class UserController {
    private logger = new LogService(UserController.name);
    constructor(private userService: UserService, private userRepository: UserRepository) { }

    // ────────────────────────────────────────────────────────────────────────────────

    @Post('createUser')
    @ApiOkResponse({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Post('/login')
    @ApiOkResponse({ type: LoginUserResDTO })
    async login(@Body() body: LoginDTO) {
        return await this.userService.login(body);
    }

    @Get('/getUserById/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async getCompanyById(@Param('id') id: string) {
        return await this.userService.getUserById(`${id}`);
    }

    @Get('/findAllUser')
    async findAllUser() {
        return await this.userService.findAllUser();
    }
    // ─────────────────────────────────────────────────────────────────────────────
    @Get('workList/findWorkListByUserId/:userId')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: FindOneWorkListDTO })
    @ApiOperation({ summary: 'หาข้อมูลWorklist โดย UserId' })
    // async getWorkList(@Param('userId') userId: string): Promise<FindOneWorkListDTO> {
    async getWorkList(@Param('userId') userId: string) {
        return await this.userService.findAllWorkListByUserId(userId);
    }

    @Get('workList/findWorkListByUserIdAndWorkListId/:userId/:workListId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: FindOneWorkListDTO })
    @ApiOperation({ summary: 'หาข้อมูลWorklist โดย UserId และ workListId' })
    async getWorkListById(@User() user: UserDB, @Param('userId') userId: string, @Param('workListId') workListId: string) {
        return await this.userService.findWorkListById(user, userId, workListId);
    }

    @Post('workList/createWorkList')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateWorkListResDTO })
    @ApiOperation({ summary: 'สร้างข้อมูล WorkListId ใน ตาราง User' })
    async createWorkList(@User() user: UserDB, @Body() body: CreateWorkListReqDTO): Promise<CreateWorkListResDTO> {
        return await this.userService.createWorkList(user, body);
    }

    @Patch('workList/updateWorkList/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: FindOneWorkListDTO })
    @ApiOperation({ summary: 'อัพเดทข้อมูล WorkList โดย UserId และ ข้อมูลจาก Body' })
    async updateWorkList(
        @User() user: UserDB,
        @Param('userId') userIdParam: string,
        @Body() workListDto: UpdateWorkListReqDTO,
    ): Promise<FindOneWorkListDTO> {
        return await this.userService.updateWork(user, userIdParam, workListDto);
    }

    @Get('workList/findIsInWorkListZone/:userId/:zoneId')
    async findIsInWorkListZone(@Param('userId') userId: string, @Param('zoneId') zoneId: string) {
        return await this.userService.findIsInWorkListZone(userId, zoneId);
    }

    @Patch('workList/deleteWorkList/:userId/:workListId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: ResDeleteWorkListDto })
    @ApiOperation({ summary: 'delete ข้อมูลworklist โดย UserId ในตาราง User' })
    async deleteWorkList(@User() user: UserDB, @Param('userId') userId: string, @Param('workListId') workListId: string) {
        return await this.userService.deleteWorkList(user, userId, workListId);
    }
    // ─────────────────────────────────────────────────────────────────────────────
    @Post('/infoMe')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async infoMe(@User() user: UserDB) {
        return await this.userService.getUserById(user.id);
    }

    @Post('paginationUser')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserPaginationResDTO })
    @ApiOperation({ summary: 'pagination user' })
    async paginationDocument(@Body() paginationDTO: UserPaginationDTO) {
        return await this.userRepository.userPagination(paginationDTO);
    }

    /// pagination worklist

    @Post('paginationWorkList')
    // @ApiOkResponse({ type: UserPaginationResDTO })
    @ApiOperation({ summary: 'pagination workList' })
    async paginationWorkList(@Body() paginationDTO: WorkListPaginationDTO) {
        return await this.userRepository.workListPagination(paginationDTO);
    }

    @Patch('update/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Param('userId') userId: string, @User() user: UserDB, @Body() updateUserDto: UpdateUserReqDto) {
        return await this.userService.update(user.id, updateUserDto);
    }

    @Delete('deleteUserById/:userId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async deleteUserByUserId(@Param('userId') userId: string, @User() user: UserDB) {
        return await this.userService.deleteUserByUserId(userId, user);
    }

    @Post('uploads-image/users')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'เพิ่มรูปภาพของผู้ใช้งาน' })
    @UseInterceptors(
        FilesInterceptor('imageUser', 1, {
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            storage: diskStorage({
                destination: `${path.resolve(__dirname, '..', '..', '..', 'upload', 'profile')}`,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async uploadUserImage(@UploadedFiles() imageUser: Express.Multer.File[], @Body() body: CreateUserImage, @User() user: UserDB) {
        this.logger.debug('user -> ', user);
        return await this.userRepository.uploadUserImage(imageUser, user.id, body);
    }
}
