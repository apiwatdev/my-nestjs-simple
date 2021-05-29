import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from './dto/createTaskDto';
import { GetTaskFilterDto } from './dto/getTasksFilterDto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {


    constructor(@InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository) {

    }
    // private tasks: Task[] = [];

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }
    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTasksWithFilter(getTasksFilterDto : GetTaskFilterDto) : Task[]{

    //     const {status, search} = getTasksFilterDto;

    //     let tasks = this.getAllTasks()

    //     if(status) {
    //         tasks = tasks.filter((task)=> task.status === status)
    //     }

    //     if(search) {
    //         tasks = tasks.filter((task)=>{
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }

    //             return false
    //         })
    //     }

    //     return tasks

    // }


    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }
    // getTaskById(id: String): Task {

    //     const found = this.tasks.find((task) => task.id === id);
    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`)
    //     }
    //     return found
    // }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }
    // createTask(createTaskDto: CreateTaskDto) {

    //     const { title, description } = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }
    // deleteTask(id: String): void {
    //     const task = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== id)

    // }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return this.tasksRepository.save(task)
    }
    // updateTaskStatus(id: String, status : TaskStatus) {
    //     const task = this.getTaskById(id);
    //     task.status = status
    //     return task;
    // }
}
