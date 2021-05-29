import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTaskDto';
import { GetTaskFilterDto } from './dto/getTasksFilterDto';
import { UpdateTaskStatusDto } from './dto/updateTaskStatusDto';
import { TaskStatus } from "./task-status.enum";
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }
    // @Get()
    // getTasks(@Query() getTaskFilterDto: GetTaskFilterDto): Task[] {

    //     if (Object.keys(getTaskFilterDto).length) {
    //         return this.tasksService.getTasksWithFilter(getTaskFilterDto)
    //     } else {
    //         return this.tasksService.getAllTasks()
    //     }

    // }


    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id)
    // }

    @Post()
    createTasks(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }
    // @Post()
    // createTasks(@Body() createTaskDto: CreateTaskDto): Task {

    //     return this.tasksService.createTask(createTaskDto)
    // }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id)
    }
    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id)
    // }


    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    }
    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body() updateTaskStatusDto: UpdateTaskStatusDto
    // ) {
    //     const { status } = updateTaskStatusDto
    //     return this.tasksService.updateTaskStatus(id, status)
    // }



}
