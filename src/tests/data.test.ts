import { getData } from '../data';
import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

jest.mock('node:fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

describe('getData', () => {
  const mockData = { tasks: [{ id: 1, name: 'test task' }] };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write default file if it does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    (readFile as jest.Mock).mockResolvedValue(JSON.stringify({ tasks: [] }));

    const result = await getData();

    expect(writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify({ tasks: [] }, null, 2)
    );
    expect(readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');
    expect(result).toEqual({ tasks: [] });
  });

  it('should read and return data if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

    const result = await getData();

    expect(writeFile).not.toHaveBeenCalled();
    expect(readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');
    expect(result).toEqual(mockData);
  });
});
