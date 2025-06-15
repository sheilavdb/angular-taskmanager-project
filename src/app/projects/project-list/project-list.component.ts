import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectService } from '../../service/project.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { TaskService, Task } from '../../service/task.service';
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
  projects: Signal<Project[]>;
  selectedSortOption: string = '';

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService
  ) {
    this.projects = this.projectService.projects;
  }

  get sortedProjects(): Project[] {
    const allProjects = [...this.projects()];

    if (this.selectedSortOption === 'name') {
      return allProjects.sort((a, b) => a.name.localeCompare(b.name)); //localeCompare = built in Javascript Method
    } else if (this.selectedSortOption === 'deadline') {
      return allProjects.sort((a, b) => {
        const A = new Date(a.deadline || 0).getTime();
        const B = new Date(b.deadline || 0).getTime();
        return A - B;
      });
    }
    return allProjects;
  }

  getUserNames(memberIds: number[]): string {
    const users = this.userService.users();
    const userNames = users
      .filter((user) => memberIds.includes(user.id))
      .map((user) => user.name);
    return userNames.join(', ');
  }

  update(project: Project) {
    this.projectService.updateProject(project);
  }

  delete(id: number) {
    this.projectService.deleteProject(id);
  }

  getTasksLeft(projectId: number): number {
    const tasks = this.taskService.tasks();
    return tasks.filter(
      (task) =>
        task.projectId === projectId &&
        task.status.toLowerCase() !== 'completed'
    ).length;
  }

  getProjectUsers(projectId: number): string {
    const allTasks = this.taskService.tasks();
    const taskForProject = allTasks.filter(
      (task) => task.projectId === projectId
    );
    const userIds = new Set(
      taskForProject.flatMap((task) => task.assignedUserId || [])
    );
    const userNames = this.userService
      .users()
      .filter((user) => userIds.has(user.id))
      .map((user) => user.name);
    return userNames.join(', ');
  }
}
