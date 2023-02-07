import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { addUserToLineUserDTOReq } from './dto/add-user-to-line-user.dto';
import { LinePaginationDTOData, LinePaginationDTOResData } from './dto/LinePagination.dto';
import { UpdateLineUserReqDTO } from './dto/update-line-user.dto';
import { LineUserService } from './line-user.service';

@ApiTags('line-user')
@Controller('line-user')
export class LineUserController {
    constructor(private readonly lineUserService: LineUserService) { }

    @Patch('/addUserIdToLineUser')
    async addUserToLineUser(@Body() body: addUserToLineUserDTOReq) {
        return await this.lineUserService.addUserToLineUser(body);
    }

    // @Get()
    // findAll() {
    //     return this.lineUserService.findAll();
    // }

    @Get('findLineUserByUserId/:userId')
    @ApiOperation({ summary: 'findOne lineUser' })
    async findOne(@Param('userId') userId: string) {
        return await this.lineUserService.findOne(userId);
    }

    @Get('findLineUserById/:id')
    @ApiOperation({ summary: 'findLineByLineId' })
    async findLineUserById(@Param('id') id: string) {
        return await this.lineUserService.findLineUserById(id);
    }

    @Get('findLineUserByUserLineId/:userLineId')
    async findLineUserByLineUserId(@Param('userLineId') userLineId: string) {
        return await this.lineUserService.findLineUserByLineUserId(userLineId);
    }

    @Post('paginationLineUser')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: LinePaginationDTOResData })
    @ApiOperation({ summary: 'pagination lineUser' })
    async paginationDocument(@Body() paginationDTO: LinePaginationDTOData) {
        return await this.lineUserService.paginationLineUser(paginationDTO);
    }

    @Patch('updateLineUserById/:id')
    @ApiOperation({ summary: 'updateLineUserById' })
    async updateLineUserById(@Param('id') id: string, @Body() body: UpdateLineUserReqDTO) {
        return await this.lineUserService.updateLineUserById(id, body);
    }
    // @Patch('')
    async updateUserLineName(userLineId: string, name: string) {
        return await this.lineUserService.updateLineUser(userLineId, name);
    }

    @Delete('deleteLineUserById/:id')
    async remove(@Param('id') id: string) {
        return await this.lineUserService.remove(id);
    }
}
