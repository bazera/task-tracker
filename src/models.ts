export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  tasks: Task[];
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export interface UpdateTaskDto {
  description: string;
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in-progress',
  Done = 'done',
}

export enum Command {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
  MarkInProgress = 'mark-in-progress',
  MarkDone = 'mark-done',
  List = 'list',
}

export enum ListType {
  All = 'all',
  Done = 'done',
  Todo = 'todo',
  InProgress = 'in-progress',
}
