import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project } from '../../service/project.service';
import { UserService, User } from '../../service/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  users: User[] = [];

  project: Project = {
    id: 0,
    name: '',
    description: '',
    deadline: '',
    memberIds: [],
  };

  isEditMode = false;

  ngOnInit() {
    this.users = this.userService.users(); // <-- load available users

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existing = this.projectService.projects().find((p) => p.id === +id);
      if (existing) {
        this.project = { ...existing };
        this.isEditMode = true;
      }
    } else {
      const maxId = Math.max(
        0,
        ...this.projectService.projects().map((p) => p.id)
      );
      this.project.id = maxId + 1;
    }
  }

  save() {
    if (this.isEditMode) {
      this.projectService.updateProject(this.project);
    } else {
      this.projectService.addProject(this.project);
    }

    this.router.navigate(['/projects']);
  }

  toggleMember(userId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.project.memberIds.includes(userId)) {
        this.project.memberIds.push(userId);
      }
    } else {
      this.project.memberIds = this.project.memberIds.filter(
        (id) => id !== userId
      );
    }
  }
}
