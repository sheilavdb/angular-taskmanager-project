import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';
import { Project } from './project.service';
import { Task } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://dummyjson.com/c/f5c8-6b8d-4bd9-ab7d';

  private _users = signal<User[]>([]);
  private _projects = signal<Project[]>([]);
  private _tasks = signal<Task[]>([]);

  // Readonly for safety
  users = this._users.asReadonly();
  projects = this._projects.asReadonly();
  tasks = this._tasks.asReadonly();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http
      .get<{ users: User[]; projects: Project[]; tasks: Task[] }>(this.apiUrl)
      .subscribe({
        next: (response) => {
          this._users.set(response.users);
          this._projects.set(response.projects);
          this._tasks.set(
            response.tasks.map((task) => ({
              ...task,
              deadline:
                typeof task.deadline === 'string'
                  ? task.deadline
                  : new Date(task.deadline).toISOString().split('T')[0],
            }))
          );
          console.log('Data loaded:', response);
        },
        error: (err) => {
          console.error('Failed to load data from API', err);
        },
      });
  }

  // User data
  addUser(user: User) {
    this._users.update((users) => [...users, user]);
  }

  updateUser(updatedUser: User) {
    this._users.update((users) =>
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }

  deleteUser(id: number) {
    this._users.update((users) => users.filter((u) => u.id !== id));
  }

  // Project data
  addProject(project: Project) {
    this._projects.update((projects) => [...projects, project]);
  }

  updateProject(updatedProject: Project) {
    this._projects.update((projects) =>
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  }

  deleteProject(id: number) {
    this._projects.update((projects) => projects.filter((p) => p.id !== id));
  }

  // Task data
  addTask(task: Task) {
    this._tasks.update((tasks) => [...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    this._tasks.update((tasks) =>
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  deleteTask(id: number) {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  completeTask(taskId: number) {
    this._tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  }
}
