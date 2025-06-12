import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Task } from './task.service';

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline?: string;
  memberIds: number[];
  tasks?: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects;

  constructor(private dataService: DataService) {
    this.projects = this.dataService.projects;
  }

  addProject(project: Project) {
    this.dataService.addProject(project);
  }

  updateProject(project: Project) {
    this.dataService.updateProject(project);
  }

  deleteProject(id: number) {
    this.dataService.deleteProject(id);
  }

  getProjectById(id: number): Project | undefined {
    return this.dataService.projects().find((p) => p.id === id);
  }

  getProjectByUser(userId: number): Project[] {
    return this.dataService
      .projects()
      .filter((p) => p.memberIds.includes(userId));
  }
}
