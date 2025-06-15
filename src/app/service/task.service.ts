import { Injectable } from '@angular/core';
import { DataService } from './data.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  assignedUserId?: number[] | null;
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks;

  constructor(private dataService: DataService) {
    this.tasks = this.dataService.tasks;
  }

  addTask(task: Task) {
    this.dataService.addTask(task);
  }

  updateTask(task: Task) {
    this.dataService.updateTask(task);
  }

  deleteTask(id: number) {
    this.dataService.deleteTask(id);
  }

  completeTask(taskId: number) {
    this.dataService.completeTask(taskId);
  }

  getTaskById(id: number): Task | undefined {
    return this.dataService.tasks().find((t) => t.id === id);
  }

  getTasksByUser(userId: number): Task[] {
    return this.dataService
      .tasks()
      .filter((t) => t.assignedUserId?.includes(userId) ?? false);
  }

  getTasksByProject(projectId: number): Task[] {
    return this.dataService.tasks().filter((t) => t.projectId === projectId);
  }
}
