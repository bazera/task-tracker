import { getData, saveData } from '../data';
import { CreateTaskDto, Task, TaskStatus } from '../models';
import { FileTaskRepository } from '../repository/file-task.repository';

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

describe('Task Service', () => {
  let repo: FileTaskRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new FileTaskRepository();
  });
  it('should return all tasks', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: mockTasks });

    const tasks = await repo.getAllTasks();

    expect(tasks).toEqual(mockTasks);
  });

  it('should filter tasks by status', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: mockTasks });

    const result = await repo.getTasksByStatus(TaskStatus.Todo);

    expect(result).toEqual([mockTasks[0]]);
  });

  it('should add a task', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    const dto: CreateTaskDto = {
      description: 'New Task',
      status: TaskStatus.Todo,
    };

    await repo.createTask(dto);

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

  it('should update a task', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    const dto = { description: 'Updated Task' };
    await repo.updateTask(1, dto);

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

  it('should delete a task', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    await repo.deleteTask(1);

    expect(saveData).toHaveBeenCalledWith(
      expect.objectContaining({
        tasks: [mockTasks[1]],
      })
    );
  });

  it('should change task status', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [...mockTasks] });

    await repo.changeTaskStatus(1, TaskStatus.Done);

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

  it('should throw if task not found', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    await expect(repo.updateTask(99, { description: 'X' })).rejects.toThrow(
      `Task with id ${99} not found`
    );
  });

  it('should throw if task not found', async () => {
    (getData as jest.Mock).mockResolvedValue({ tasks: [] });

    await expect(repo.changeTaskStatus(99, TaskStatus.Todo)).rejects.toThrow(
      `Task with id ${99} not found`
    );
  });
});
