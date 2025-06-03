import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project } from '../../service/project.service';
import { UserService, User } from '../../service/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  users: User[] = [];
  projectForm!: FormGroup;
  projectId = 0;
  isEditMode = false;

  ngOnInit() {
    this.users = this.userService.users(); // <-- load available users

    const id = this.route.snapshot.paramMap.get('id');
    const projects = this.projectService.projects();

    if (id) {
      const existing = projects.find((p) => p.id === +id);
      if (existing) {
        this.projectId = existing.id;
        this.isEditMode = true;
        this.initForm(existing);
      }
    } else {
      this.projectId = Math.max(0, ...projects.map((p) => p.id)) + 1;
      this.initForm();
    }
  }

  initForm(project?: Project) {
    this.projectForm = this.fb.group({
      name: [project?.name || '', Validators.required],
      description: [project?.description || '', Validators.required],
      deadline: [project?.deadline || '', Validators.required],
      memberIds: this.fb.array(
        this.users.map((user) =>
          this.fb.control(project?.memberIds.includes(user.id) || false)
        )
      ),
    });
  }
  get memberIds(): FormArray {
    return this.projectForm.get('memberIds') as FormArray;
  }

  saveProject() {
    if (this.projectForm.invalid) return;

    const formValue = this.projectForm.value;
    const selectedMemberIds = this.users
      .map((user, i) => (formValue.memberIds[i] ? user.id : null))
      .filter((id): id is number => id !== null);

    const project: Project = {
      id: this.projectId,
      name: formValue.name,
      description: formValue.description,
      deadline: formValue.deadline,
      memberIds: selectedMemberIds,
    };

    if (this.isEditMode) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.addProject(project);
    }

    this.router.navigate(['/projects']);
  }
}
