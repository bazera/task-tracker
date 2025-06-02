import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from '../models';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTasksByStatus(status: TaskStatus): Promise<Task[]>;
  createTask(dto: CreateTaskDto): Promise<void>;
  updateTask(id: number, dto: UpdateTaskDto): Promise<void>;
  deleteTask(id: number): Promise<void>;
  changeTaskStatus(id: number, status: TaskStatus): Promise<void>;
}
