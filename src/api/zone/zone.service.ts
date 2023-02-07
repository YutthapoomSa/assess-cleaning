import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AssessmentService } from '../assessment/assessment.service';
import { LogService } from './../../services/log.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateZoneReqDto, CreateZoneResDto } from './dto/create-zone.dto';
import { DeleteZoneResDTO } from './dto/delete-zone.dto';
import { FindAllZoneResDTO } from './dto/findall.dto';
import { UpdateZoneDto, UpdateZoneResDTO } from './dto/update-zone.dto';
import { ZoneResultResDTO } from './dto/zone-result-res.dto';
import { ZoneRepository } from './zone.repository';

@Injectable()
export class ZoneService {
    private logger = new LogService(ZoneService.name);
    @Inject(forwardRef(() => AssessmentService))
    private AssessmentService: AssessmentService;
    constructor(private readonly zoneRepository: ZoneRepository) {}

    // private resZone(zone: ZoneDB) {
    //     const tag = this.resZone.name;
    //     try {
    //         console.log('zone', zone);
    //         return {
    //             id: zone._id,
    //             name: zone.name,
    //             zoneList: zone.zoneList,
    //             checkList: zone.checkList,
    //             estimate: zone.estimate,
    //         };
    //     } catch (error) {
    //         this.logger.error(`${tag} -> `, error);
    //         throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async findAllZone() {
        this.logger.debug('findAllZone');
        const tag = this.findAllZone.name;

        try {
            const resultAllZone = await this.zoneRepository.findAllZone();
            return new FindAllZoneResDTO(ResStatus.success, '', resultAllZone);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createZone(createZoneDto: CreateZoneReqDto) {
        this.logger.debug('createZone');
        const tag = this.createZone.name;
        try {
            const resultZone = await this.zoneRepository.create(createZoneDto);
            return new CreateZoneResDto(ResStatus.success, '♥ สร้างข้อมูลพื้นที่สำเร็จ ♥', resultZone);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(zoneId: string, body: UpdateZoneDto) {
        const tag = this.update.name;
        try {
            const resultUpdate = await this.zoneRepository.updateZone(zoneId, body);
            return new UpdateZoneResDTO(ResStatus.success, '♥ อัพเดตข้อมูลพื้นที่สำเร็จ ♥', resultUpdate);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getZoneById(_zoneId: string) {
        const tag = this.getZoneById.name;
        try {
            let tmpResultZoneById = [];
            let resultCheckList = null;
            let resultEstimate = null;
            // const result = await this.AssessmentService.findOne()

            const resultZone = await this.zoneRepository.getZoneById(_zoneId);
            // console.log('resultZone Service', resultZone);
            // if (resultZone.checkList) {
            //     resultCheckList = await this.AssessmentService.findOne(String(resultZone.checkList));
            // }
            // if (resultZone.estimate) {
            //     resultEstimate = await this.AssessmentService.findOne(String(resultZone.estimate));
            // }

            // tmpResultZoneById.push(resultZone, resultCheckList, resultEstimate);
            // // console.log('tmpResultZoneById', tmpResultZoneById.length);
            // if (tmpResultZoneById.length > 0) {
            //     return new ZoneResultResDTO(ResStatus.success, '♥ ค้นหาข้อมูลสำเร็จ ♥', resultZone);
            // } else {
            //     return new ZoneResultResDTO(ResStatus.success, '♥ ค้นหาข้อมูลสำเร็จ ♥', resultZone);
            // }
            return new ZoneResultResDTO(ResStatus.success, '♥ ค้นหาข้อมูลสำเร็จ ♥', resultZone);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteZoneById(zoneId: string) {
        const tag = this.deleteZoneById.name;
        try {
            const resultDeleteZone = await this.zoneRepository.deleteZone(zoneId);
            return new DeleteZoneResDTO(ResStatus.success, '♥ ลบข้อมูลสำเร็จ ♥');
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
