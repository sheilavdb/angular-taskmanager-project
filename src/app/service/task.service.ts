import { Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  assignedUserId?: number[] | null; // array of user IDs
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Create UI mockup',
      description: 'Design layout for new feature',
      status: 'in-progress',
      priority: 'high',
      deadline: '2025-06-10',
      assignedUserId: [1],
      projectId: 1,
    },
    {
      id: 2,
      title: 'Fix bug in dashboard',
      description: 'Resolve display issue in charts',
      status: 'completed',
      priority: 'medium',
      deadline: '2025-06-01',
      assignedUserId: [2],
      projectId: 1,
    },
  ]);

  tasks = this._tasks.asReadonly();

  addTask(task: Task) {
    this._tasks.update((tasks) => [...tasks, task]);
  }

  updateTask(updated: Task) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  deleteTask(id: number) {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  getTaskById(id: number): Task | undefined {
    return this._tasks().find((t) => t.id === id);
  }

  getTasksByUser(userId: number): Task[] {
    return this._tasks().filter((t) => t.assignedUserId?.includes(userId));
  }

  getTasksByProject(projectId: number): Task[] {
    return this._tasks().filter((t) => t.projectId === projectId);
  }
}
