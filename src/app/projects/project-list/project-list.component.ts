import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectService } from '../../service/project.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.projects = this.projectService.projects;
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
}
