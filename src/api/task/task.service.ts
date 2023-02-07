import { LogService } from './../../services/log.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private logger = new LogService(TaskService.name);

    constructor(private taskRepository: TaskRepository) {}

    async create(createTaskDTO: CreateTaskDTO) {
        const tag = this.create.name;
        try {
            return await this.taskRepository.create(createTaskDTO);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(_id: string) {
        const tag = this.remove.name;
        try {
            return await this.taskRepository.remove(_id);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.remove.name;
        try {
            return await this.taskRepository.findAll();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByUserId(id : string) {
        const tag = this.remove.name;
        try {
            return await this.taskRepository.find(id)
            
        } catch (error) {
            
        }
    }
}
