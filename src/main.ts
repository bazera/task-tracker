#!/usr/bin/env node

import { executeCommand } from './commands/command-registry';

async function main() {
  await executeCommand();
}

main();
