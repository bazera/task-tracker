# Task Tracker CLI

A command-line interface (CLI) tool for managing and tracking tasks efficiently. Built with TypeScript, this tool helps you organize your tasks with a simple and intuitive interface.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- List all tasks with filtering options
- Persistent storage of tasks
- Simple and intuitive command-line interface

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
```

## Usage

After installation, you can use the following commands:

```bash
# Start the application
npm start

# For development
npm run dev
```

## Available Commands

- `task-cli add <description>` - Add a new task
- `task-cli list` - List all tasks
- `task-cli complete <id>` - Mark a task as complete
- `task-cli incomplete <id>` - Mark a task as incomplete
- `task-cli delete <id>` - Delete a task
- `task-cli help` - Show help information

## Development

This project is built with:

- TypeScript
- Node.js
- ts-node (for development)

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run dev` - Run the TypeScript code directly using ts-node

## Project Structure

```
task-tracker/
├── src/
│   ├── commands.ts    # CLI command implementations
│   ├── data.ts        # Data handling utilities
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
