import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTaskDto';
import { GetTaskFilterDto } from './dto/getTasksFilterDto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTasksWithFilter(getTasksFilterDto : GetTaskFilterDto) : Task[]{

        const {status, search} = getTasksFilterDto;
        
        let tasks = this.getAllTasks()

        if(status) {
            tasks = tasks.filter((task)=> task.status === status)
        }

        if(search) {
            tasks = tasks.filter((task)=>{
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }

                return false
            })
        }

        return tasks

    }

    getTaskById(id: String): Task {

        const found = this.tasks.find((task) => task.id === id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    createTask(createTaskDto: CreateTaskDto) {

        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: String): void {
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== id)

    }

    updateTaskStatus(id: String, status : TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status
        return task;
    }
}
