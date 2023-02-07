import { ShareModule } from '../../share/share.module';
import { TaskRepository } from './task.repository';
import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
    imports: [ShareModule, forwardRef(() => TaskModule)],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskService],
})
export class TaskModule {}
