export class TaskError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'TaskError';
  }
}

export class TaskNotFoundError extends TaskError {
  constructor(id: number) {
    super(`Task with id ${id} not found`, 'TASK_NOT_FOUND');
  }
}

export class InvalidInputError extends TaskError {
  constructor(message: string) {
    super(message, 'INVALID_INPUT');
  }
}

export class InvalidCommandError extends TaskError {
  constructor(command: string) {
    super(`Invalid command: ${command}`, 'INVALID_COMMAND');
  }
}
