import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     // define a temporary array to hold the result
    //     let tasks = this.getAllTasks();
    //     // do something with status
    //     if(status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }
    //     // do something with search
    //     if(search) {
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     // return final result
    //     return tasks;
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
    // deteleTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task: Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
