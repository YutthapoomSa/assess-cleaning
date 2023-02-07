import { TaskDB } from './../../entities/task.entity';
import { LogService } from '../../services/log.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskRepository {
    private logger = new LogService(TaskRepository.name);

    constructor(@InjectModel(TaskDB.name) private readonly taskModel: Model<TaskDB>) {}

    async create(createTaskDTO: CreateTaskDTO) {
        const tag = this.create.name;
        try {
            const create = new this.taskModel({
                topic: createTaskDTO.topic,
                lineUserId: createTaskDTO.lineUserId,
                status: createTaskDTO.status,
                replyToken: createTaskDTO.replyToken,
            });

            return await create.save();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.create.name;
        try {
            return await this.taskModel.find();
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async find(id: string) {
        const tag = this.create.name;
        try {
            return await this.taskModel.find({ lineUserId: id });
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const tag = this.create.name;
        try {
            return await this.taskModel.deleteOne({ _id: id });
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
