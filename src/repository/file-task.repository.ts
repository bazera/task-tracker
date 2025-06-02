import { getData, saveData } from '../data';
import { TaskNotFoundError } from '../errors';
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from '../models';
import { TaskRepository } from './repository.model';

export class FileTaskRepository implements TaskRepository {
  private async getData(): Promise<Task[]> {
    const data = await getData();
    return data.tasks;
  }

  private async saveData(tasks: Task[]): Promise<void> {
    await saveData({ tasks });
  }

  private findTaskIndex(tasks: Task[], id: number): number {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new TaskNotFoundError(id);
    }
    return index;
  }

  private generateNextId(tasks: Task[]): number {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((task) => task.id)) + 1;
  }

  async getAllTasks(): Promise<Task[]> {
    const data = await this.getData();
    return data;
  }

  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    const data = await this.getData();
    return data.filter((t) => t.status === status);
  }

  async createTask(dto: CreateTaskDto) {
    const data = await this.getData();
    data.push({
      id: this.generateNextId(data),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...dto,
    });
    return this.saveData(data);
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    const data = await this.getData();
    const index = this.findTaskIndex(data, id);
    console.log('###', index);
    data[index] = {
      ...data[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.saveData(data);
  }

  async deleteTask(id: number) {
    const data = await this.getData();
    const index = this.findTaskIndex(data, id);
    data.splice(index, 1);
    return this.saveData(data);
  }

  async changeTaskStatus(id: number, status: TaskStatus) {
    const data = await this.getData();
    const index = this.findTaskIndex(data, id);
    data[index] = {
      ...data[index],
      status,
      updatedAt: new Date(),
    };
    return this.saveData(data);
  }
}
