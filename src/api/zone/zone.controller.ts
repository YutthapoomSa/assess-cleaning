import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { User } from './../../share/decorator/user.decorator';
import { CreateZoneReqDto } from './dto/create-zone.dto';
import { DeleteZoneResDTO } from './dto/delete-zone.dto';
import { ZonePaginationDTO, ZonePaginationResDTO } from './dto/pagination-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZoneRepository } from './zone.repository';
import { ZoneService } from './zone.service';

@ApiTags('zone')
@Controller('zone')
export class ZoneController {
    private logger = new LogService(ZoneController.name);
    constructor(private readonly zoneService: ZoneService, private zoneRepository: ZoneRepository) {}

    @Post('createZone')
    async createZone(@Body() createZoneDto: CreateZoneReqDto) {
        return await this.zoneService.createZone(createZoneDto);
    }

    @Get('/findAllZone')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async findAllZone(@User() user: UserDB){
        return await this.zoneService.findAllZone();
    }

    @Patch('/updateZoneByZoneID/:zoneId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateZone(@User() user: UserDB, @Param('zoneId') zoneId: string, @Body() updateZoneDto: UpdateZoneDto) {
        return await this.zoneService.update(zoneId, updateZoneDto);
    }

    @Get('/getZoneByZoneId/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async getZoneById(@User() user: UserDB, @Param('id') id: string) {
        return await this.zoneService.getZoneById(id);
    }

    @Post('paginationZone')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: ZonePaginationResDTO })
    @ApiOperation({ summary: 'pagination zone' })
    paginationDocument(@Body() paginationDTO: ZonePaginationDTO) {
        return this.zoneRepository.zonePagination(paginationDTO);
    }

    @Delete('deleteZone/:id')
    @ApiOkResponse({ type: DeleteZoneResDTO })
    async deleteZone(@Param('id') id: string) {
        return this.zoneService.deleteZoneById(id);
    }
    
    // @Get()
    // findAll() {
    //   return this.zoneService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.zoneService.findOne(+id);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.zoneService.remove(+id);
    // }
}
