import { Component, computed, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectService } from '../../service/project.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReusableCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);
  private taskService = inject(TaskService);

  projects = this.projectService.projects; // Signal<Project[]>
  users = signal(this.userService.users()); // Wrap users in a signal to track updates
  tasks = this.taskService.tasks; // Signal<Task[]>

  selectedSortOption = signal('');

  sortedProjects = computed(() => {
    const allProjects = [...this.projects()];
    if (this.selectedSortOption() === 'name') {
      return allProjects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedSortOption() === 'deadline') {
      return allProjects.sort(
        (a, b) =>
          new Date(a.deadline || 0).getTime() -
          new Date(b.deadline || 0).getTime()
      );
    }
    return allProjects;
  });

  // Computed map: projectId => number of tasks left (not completed)
  tasksLeftMap = computed(() => {
    const map = new Map<number, number>();
    for (const project of this.projects()) {
      const count = this.tasks().filter(
        (task) =>
          task.projectId === project.id &&
          task.status.toLowerCase() !== 'completed'
      ).length;
      map.set(project.id, count);
    }
    return map;
  });

  // Computed map: projectId => comma-separated user names assigned to tasks in the project
  projectUsersMap = computed(() => {
    const map = new Map<number, string>();
    for (const project of this.projects()) {
      const tasksForProject = this.tasks().filter(
        (task) => task.projectId === project.id
      );
      const userIds = new Set(
        tasksForProject.flatMap((task) => task.assignedUserId || [])
      );
      const userNames = this.users()
        .filter((user) => userIds.has(user.id))
        .map((user) => user.name)
        .join(', ');
      map.set(project.id, userNames);
    }
    return map;
  });

  getTasksLeft(projectId: number): number {
    return this.tasksLeftMap().get(projectId) ?? 0;
  }

  getProjectUsers(projectId: number): string {
    return this.projectUsersMap().get(projectId) ?? '';
  }

  update(project: Project) {
    this.projectService.updateProject(project);
  }

  delete(id: number) {
    this.projectService.deleteProject(id);
  }
}
