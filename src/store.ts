import { getData, saveData } from './data';
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from './models';

function findTaskIndex(tasks: Task[], id: number): number {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  return index;
}

function generateNextId(tasks: Task[]): number {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
}

export async function getAllTasks(): Promise<Task[]> {
  const data = await getData();
  return data.tasks;
}

export async function getTasksByStatus(status: TaskStatus): Promise<Task[]> {
  const data = await getData();
  return data.tasks.filter((t) => t.status === status);
}

export async function createTask(dto: CreateTaskDto) {
  const data = await getData();
  data.tasks.push({
    id: generateNextId(data.tasks),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...dto,
  });
  return saveData(data);
}

export async function updateTask(id: number, dto: UpdateTaskDto) {
  const data = await getData();
  const index = findTaskIndex(data.tasks, id);
  data.tasks[index] = {
    ...data.tasks[index],
    ...dto,
    updatedAt: new Date(),
  };
  return saveData(data);
}

export async function deleteTask(id: number) {
  const data = await getData();
  const index = findTaskIndex(data.tasks, id);
  data.tasks.splice(index, 1);
  return saveData(data);
}

export async function changeTaskStatus(id: number, status: TaskStatus) {
  const data = await getData();
  const index = findTaskIndex(data.tasks, id);
  data.tasks[index] = {
    ...data.tasks[index],
    status,
    updatedAt: new Date(),
  };
  return saveData(data);
}
