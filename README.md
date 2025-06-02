# Task Tracker CLI

A command-line interface (CLI) tool for managing and tracking tasks efficiently. Built with TypeScript, this tool helps you organize your tasks with a simple and intuitive interface.

## Features

- Create, read, update, and delete tasks
- Track task status (Todo, In Progress, Done)
- List tasks with status filtering
- Persistent storage of tasks
- Type-safe implementation with TypeScript
- Error handling with detailed feedback

## Installation

```bash
# Clone the repository
git clone https://github.com/bazera/task-tracker.git

# Navigate to the project directory
cd task-tracker

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI globally (to use task-cli command)
npm link
```

## Available Commands

- `task-cli add <description>` - Add a new task
- `task-cli update <id> <description>` - Update a task's description
- `task-cli delete <id>` - Delete a task
- `task-cli mark-in-progress <id>` - Mark a task as in progress
- `task-cli mark-done <id>` - Mark a task as done
- `task-cli list [status]` - List all tasks or filter by status (todo/in-progress/done)

### Examples

```bash
# Add a new task
task-cli add "Complete the documentation"

# Update a task
task-cli update 1 "Update the documentation with examples"

# Mark a task as in progress
task-cli mark-in-progress 1

# Mark a task as done
task-cli mark-done 1

# List all tasks
task-cli list

# List tasks with specific status
task-cli list todo
task-cli list in-progress
task-cli list done

# Delete a task
task-cli delete 1
```

## Error Handling

The CLI provides clear error messages for various scenarios:

- Invalid commands
- Invalid task IDs
- Missing required arguments
- Task not found
- Invalid task status

## Development

This project is built with:

- TypeScript
- Node.js
- ts-node (for development)

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run dev` - Run the TypeScript code directly using ts-node
- `npm test` - Run the test suite

## Project Structure

```
task-tracker/
├── src/
│   ├── commands.ts    # CLI command implementations
│   ├── data.ts        # Data handling utilities
│   ├── errors.ts      # Custom error definitions
│   ├── index.ts       # Entry point
│   ├── models.ts      # Type definitions
│   └── store.ts       # Data storage management
├── dist/              # Compiled JavaScript files
├── data.json          # Task storage file
└── package.json       # Project configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Giorgi Bazerashvili

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/bazera/task-tracker/issues) on GitHub.

## Note

This project has been done as one of the practice projects from roadmap.sh backend roadmap project

https://roadmap.sh/projects/task-tracker
