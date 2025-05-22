import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { Result } from './models';

const filePath = path.join(__dirname, '..', 'data.json');

export async function getData(): Promise<Result> {
  if (!existsSync(filePath)) {
    await writeFile(filePath, JSON.stringify({ tasks: [] }, null, 2));
  }

  const data = await readFile(filePath, 'utf8');

  return JSON.parse(data);
}

export async function saveData(data: Result) {
  await writeFile(filePath, JSON.stringify(data, null, 2));
}
