import { getData, saveData } from '../data';
import { CreateTaskDto, Task, TaskStatus } from '../models';
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
} from '../store';

jest.mock('../data', () => ({
  getData: jest.fn(),
  saveData: jest.fn(),
}));

const mockTasks: Task[] = [
  {
    id: 1,
    description: 'Task 1',
    status: TaskStatus.Todo,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    description: 'Task 2',
    status: TaskStatus.Done,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('Task Serviec', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('getAllTasks returns all tasks', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: mockTasks });

    const tasks = await getAllTasks();

    expect(tasks).toEqual(mockTasks);
  });

  test('getTasksByStatus filters tasks by status', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: mockTasks });

    const result = await getTasksByStatus(TaskStatus.Todo);

    expect(result).toEqual([mockTasks[0]]);
  });

  test('createTask adds a task and saves data', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    const dto: CreateTaskDto = {
      description: 'New Task',
      status: TaskStatus.Todo,
    };

    await createTask(dto);

    expect(saveData).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [
          expect.objectContaining({
            id: 1,
            description: dto.description,
            status: dto.status,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ],
      })
    );
  });

  test('updateTask updates task fields and saves data', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    const dto = { description: 'Updated Task' };
    await updateTask(1, dto);

    expect(saveData).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [
          expect.objectContaining({
            id: 1,
            description: dto.description,
            updatedAt: expect.any(Date),
          }),
          mockTasks[1],
        ],
      })
    );
  });

  test('updateTask throws if task not found', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    await expect(updateTask(99, { description: 'X' })).rejects.toThrow(
      'Task not found'
    );
  });

  test('deleteTask removes task and saves data', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    await deleteTask(1);

    expect(saveData).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [mockTasks[1]],
      })
    );
  });

  test('changeTaskStatus updates task status and saves data', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    await changeTaskStatus(1, TaskStatus.Done);

    expect(saveData).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [
          expect.objectContaining({
            id: 1,
            status: TaskStatus.Done,
            updatedAt: expect.any(Date),
          }),
          mockTasks[1],
        ],
      })
    );
  });

  test('changeTaskStatus throws if task not found', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    await expect(changeTaskStatus(99, TaskStatus.Todo)).rejects.toThrow(
      'Task not found'
    );
  });
});
