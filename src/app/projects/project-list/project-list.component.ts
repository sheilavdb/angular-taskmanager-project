import { Component } from '@angular/core';
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
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  get projects() {
    return this.projectService.projects;
  }

  get users() {
    return this.userService.users();
  }

  getUserNames(memberIds: number[]): string {
    const userNames = this.users
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
