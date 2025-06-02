import { InvalidCommandError, InvalidInputError, TaskError } from '../errors';
import { Command } from '../models';
import { FileTaskRepository } from '../repository/file-task.repository';
import {
  AddCommand,
  ListCommand,
  MarkDoneCommand,
  UpdateCommand,
  DeleteCommand,
  MarkInProgressCommand,
  ICommand,
} from './commands';

const taskRepository = new FileTaskRepository();

const commandRegistry: Record<Command, ICommand> = {
  [Command.Add]: new AddCommand(taskRepository),
  [Command.Update]: new UpdateCommand(taskRepository),
  [Command.Delete]: new DeleteCommand(taskRepository),
  [Command.MarkInProgress]: new MarkInProgressCommand(taskRepository),
  [Command.MarkDone]: new MarkDoneCommand(taskRepository),
  [Command.List]: new ListCommand(taskRepository),
};

export async function executeCommand() {
  try {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      throw new InvalidInputError('No command provided');
    }

    const command = args[0] as Command;

    if (!Object.values(Command).includes(command)) {
      throw new InvalidCommandError(command);
    }

    const rest = args.slice(1);
    const commandFn = commandRegistry[command];
    await commandFn.execute(rest);
  } catch (error) {
    if (error instanceof TaskError) {
      console.error(error.message);
    } else {
      console.error('An unexpected error occurred');
      process.exit(1);
    }
  }
}
