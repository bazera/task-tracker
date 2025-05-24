import { InvalidInputError, TaskError } from '../errors';
import { TaskStatus } from '../models';
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
} from '../store';

export interface ICommand {
  execute: (args: string[]) => Promise<void>;
  isValidArgs: (args: string[]) => boolean;
}

abstract class BaseCommand implements ICommand {
  protected validateArgs(args: string[]): boolean {
    if (!this.isValidArgs(args)) {
      throw new InvalidInputError('Invalid arguments');
    }
    return true;
  }

  protected handleError(error: unknown, operation: string): void {
    if (error instanceof TaskError) {
      console.error(`Failed to ${operation}: ${error.message}`);
    } else {
      console.error('An unexpected error occurred');
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
    }
  }

  abstract execute(args: string[]): Promise<void>;
  abstract isValidArgs(args: string[]): boolean;
}

export class AddCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    return args.length === 1 && args[0].length > 0;
  }

  async execute(args: string[]): Promise<void> {
    this.validateArgs(args);

    try {
      await createTask({ description: args[0], status: TaskStatus.Todo });
      console.log('Task created');
    } catch (error) {
      this.handleError(error, 'create task');
    }
  }
}

export class UpdateCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    return args.length === 2 && args[0].length > 0 && args[1].length > 0;
  }

  async execute(args: string[]): Promise<void> {
    this.validateArgs(args);

    try {
      await updateTask(Number(args[0]), { description: args[1] });
      console.log('Task updated');
    } catch (error) {
      this.handleError(error, 'update task');
    }
  }
}

export class DeleteCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    return args.length === 1 && !isNaN(Number(args[0]));
  }

  async execute(args: string[]): Promise<void> {
    this.validateArgs(args);

    try {
      await deleteTask(Number(args[0]));
      console.log('Task deleted');
    } catch (error) {
      this.handleError(error, 'delete task');
    }
  }
}

export class MarkInProgressCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    return args.length === 1 && !isNaN(Number(args[0]));
  }

  async execute(args: string[]): Promise<void> {
    this.validateArgs(args);

    try {
      await changeTaskStatus(Number(args[0]), TaskStatus.InProgress);
      console.log('Task marked as in progress');
    } catch (error) {
      this.handleError(error, 'mark task as in progress');
    }
  }
}

export class MarkDoneCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    return args.length === 1 && !isNaN(Number(args[0]));
  }

  async execute(args: string[]): Promise<void> {
    this.validateArgs(args);

    try {
      await changeTaskStatus(Number(args[0]), TaskStatus.Done);
      console.log('Task marked as done');
    } catch (error) {
      this.handleError(error, 'mark task as done');
    }
  }
}

export class ListCommand extends BaseCommand {
  isValidArgs(args: string[]): boolean {
    if (args.length > 1) {
      throw new InvalidInputError(
        'List command accepts at most one argument (status)'
      );
    }
    if (
      args.length === 1 &&
      !Object.values(TaskStatus).includes(args[0] as TaskStatus)
    ) {
      throw new InvalidInputError(
        `Invalid status. Must be one of: ${Object.values(TaskStatus).join(
          ', '
        )}`
      );
    }
    return true;
  }

  async execute(args: string[]): Promise<void> {
    try {
      this.validateArgs(args);
      const status = args[0] as TaskStatus;

      const tasks = status
        ? await getTasksByStatus(status)
        : await getAllTasks();

      if (tasks.length === 0) {
        console.log(
          status ? `No tasks found with status: ${status}` : 'No tasks found'
        );
        return;
      }

      console.log(tasks.map((t) => `${t.id} - ${t.description} - ${t.status}`));
    } catch (error) {
      this.handleError(error, 'list tasks');
    }
  }
}
