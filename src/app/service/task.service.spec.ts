import { TaskService, Task } from './task.service';
import { signal } from '@angular/core';

describe('TaskService', () => {
  let service: TaskService;
  let mockDataService: any;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Task A',
      description: 'Description A',
      status: 'not-started',
      priority: 'high',
      deadline: '2025-07-01',
      assignedUserId: [1, 2],
      projectId: 101,
    },
    {
      id: 2,
      title: 'Task B',
      description: 'Description B',
      status: 'in-progress',
      priority: 'medium',
      deadline: '2025-08-01',
      assignedUserId: [3],
      projectId: 102,
    },
  ];

  beforeEach(() => {
    mockDataService = {
      tasks: signal<Task[]>([...mockTasks]),
      updateTask: jest.fn(),
      addTask: jest.fn(),
      deleteTask: jest.fn(),
      completeTask: jest.fn(),
    };

    service = new TaskService(mockDataService);
  });

  it('should return the correct task by ID', () => {
    const result = service.getTaskById(1);
    expect(result).toEqual(mockTasks[0]);
  });

  it('should call dataService.updateTask with the updated task', () => {
    const updatedTask: Task = { ...mockTasks[0], title: 'Updated Task A' };
    service.updateTask(updatedTask);
    expect(mockDataService.updateTask).toHaveBeenCalledWith(updatedTask);
  });

  it('should return only tasks assigned to a given user', () => {
    const result = service.getTasksByUser(1);
    expect(result).toEqual([mockTasks[0]]);
  });
});
