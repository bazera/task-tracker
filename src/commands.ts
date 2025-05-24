import { Command, TaskStatus } from './models';
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
} from './store';

interface ICommand {
  execute: (args: string[]) => Promise<void>;
}

class AddCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    return createTask({ description: args[0], status: TaskStatus.Todo })
      .then(() => console.log('Task created'))
      .catch((err) => {
        console.error('Error creating task', err);
      });
  }
}

class UpdateCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    return updateTask(Number(args[0]), { description: args[1] })
      .then(() => console.log('Task updated'))
      .catch((err) => {
        console.error('Error updating task', err);
      });
  }
}

class DeleteCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    return deleteTask(Number(args[0]))
      .then(() => console.log('Task deleted'))
      .catch((err) => {
        console.error('Error deleting task', err);
      });
  }
}

class MarkInProgressCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    return changeTaskStatus(Number(args[0]), TaskStatus.InProgress)
      .then(() => console.log('Task marked as in progress'))
      .catch((err) => {
        console.error('Error marking task as in progress', err);
      });
  }
}

class MarkDoneCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    return changeTaskStatus(Number(args[0]), TaskStatus.Done)
      .then(() => console.log('Task marked as done'))
      .catch((err) => {
        console.error('Error marking task as done', err);
      });
  }
}

class ListCommand implements ICommand {
  execute(args: string[]): Promise<void> {
    const status = args[0] as TaskStatus;
    if (!status) {
      return getAllTasks()
        .then((tasks) =>
          console.log(
            tasks.map((t) => `${t.id} - ${t.description} - ${t.status}`)
          )
        )
        .catch((err) => {
          console.error('Error listing tasks', err);
        });
    }

    return getTasksByStatus(args[0] as TaskStatus)
      .then((tasks) =>
        console.log(
          tasks.map((t) => `${t.id} - ${t.description} - ${t.status}`)
        )
      )
      .catch((err) => {
        console.error('Error listing tasks', err);
      });
  }
}

const commandRegistry: Record<Command, ICommand> = {
  [Command.Add]: new AddCommand(),
  [Command.Update]: new UpdateCommand(),
  [Command.Delete]: new DeleteCommand(),
  [Command.MarkInProgress]: new MarkInProgressCommand(),
  [Command.MarkDone]: new MarkDoneCommand(),
  [Command.List]: new ListCommand(),
};

export async function executeCommand() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('No command provided');
    return;
  }

  const command = args[0] as Command;
  const rest = args.slice(1);

  const commandFn = commandRegistry[command];
  await commandFn.execute(rest);
}
