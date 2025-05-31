import { Injectable, signal } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline?: string;
  memberIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _projects = signal<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Update the UI and UX for the main site.',
      deadline: '2025-07-01',
      memberIds: [],
    },
    {
      id: 2,
      name: 'Mobile App Launch',
      description: 'Prepare for launch of new mobile app.',
      deadline: '2025-08-15',
      memberIds: [2, 3],
    },
  ]);

  projects = this._projects.asReadonly();

  addProject(project: Project) {
    this._projects.update((projects) => [...projects, project]);
  }

  updateProject(updated: Project) {
    this._projects.update((projects) =>
      projects.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  deleteProject(id: number) {
    this._projects.update((projects) => projects.filter((p) => p.id !== id));
  }

  getProjectById(id: number): Project | undefined {
    return this._projects().find((p) => p.id === id);
  }

  getProjectByUser(userId: number): Project[] {
    return this._projects().filter((p) => p.memberIds.includes(userId));
  }
}
