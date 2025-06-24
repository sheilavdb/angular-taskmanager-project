import { TaskListComponent } from './task-list.component';
import { Task } from '../../service/task.service';
import { signal } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let mockTaskService: any;
  let mockUserService: any;

  beforeEach(() => {
    mockTaskService = {
      tasks: signal<Task[]>([
        {
          id: 1,
          title: 'Task 1',
          status: 'not-started',
          priority: 'medium',
          description: 'test description',
          projectId: 1,
          deadline: '2025-06-25',
          assignedUserId: [1],
        },
        {
          id: 2,
          title: 'Task 2',
          status: 'not-started',
          priority: 'medium',
          description: 'test description',
          projectId: 2,
          deadline: '2025-06-24',
          assignedUserId: [2],
        },
      ]),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      completeTask: jest.fn(),
    };

    mockUserService = {
      users: signal([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]),
    };

    component = new TaskListComponent(mockTaskService, mockUserService);
  });

  it('should call completeTask with right ID', () => {
    component.complete(1);
    expect(mockTaskService.completeTask).toHaveBeenCalledWith(1);
  });

  it('should call deleteTask with right ID', () => {
    component.delete(2);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(2);
  });

  it('should filter tasks by selected user ID', () => {
    component.selectedUserId = 1;
    const filtered = component.filteredTasks;
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe(1);
  });

  it('should return all tasks if no user is selected', () => {
    component.selectedUserId = '';
    const result = component.filteredTasks;
    expect(result.length).toBe(2);
  });
});
