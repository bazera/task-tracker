import { InvalidCommandError, InvalidInputError, TaskError } from '../errors';
import { Command } from '../models';
import {
  AddCommand,
  ListCommand,
  MarkDoneCommand,
  UpdateCommand,
  DeleteCommand,
  MarkInProgressCommand,
  ICommand,
} from './commands';

const commandRegistry: Record<Command, ICommand> = {
  [Command.Add]: new AddCommand(),
  [Command.Update]: new UpdateCommand(),
  [Command.Delete]: new DeleteCommand(),
  [Command.MarkInProgress]: new MarkInProgressCommand(),
  [Command.MarkDone]: new MarkDoneCommand(),
  [Command.List]: new ListCommand(),
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
