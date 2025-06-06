import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService, User } from '../../service/user.service';
import { TaskService, Task } from '../../service/task.service';
import { ProjectService, Project } from '../../service/project.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);
  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  taskForm!: FormGroup;
  taskId = 0;
  isEditMode = false;

  users: User[] = [];
  projects: Project[] = [];

  ngOnInit(): void {
    this.users = this.userService.users(); //Load all users
    this.projects = this.projectService.projects();

    const id = this.route.snapshot.paramMap.get('id');
    const tasks = this.taskService.tasks();

    if (id) {
      const existing = tasks.find((t) => t.id === +id);
      if (existing) {
        this.isEditMode = true;
        this.taskId = existing.id;
        this.initForm(existing);
        return;
      }
    }

    this.taskId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    this.initForm();
  }

  initForm(task?: Task) {
    this.taskForm = this.fb.group({
      title: [task?.title || '', Validators.required],
      description: [task?.description || '', Validators.required],
      status: [task?.status || 'not-started', Validators.required],
      priority: [task?.priority || 'medium', Validators.required],
      deadline: [task?.deadline || '', Validators.required],
      projectId: [task?.projectId || '', Validators.required],
      assignedUserId: this.fb.array(
        this.users.map((u) =>
          this.fb.control(task?.assignedUserId?.includes(u.id) || false)
        )
      ),
    });
  }

  get assignedUserIdArray(): FormArray {
    return this.taskForm.get('assignedUserId') as FormArray;
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    const selectedUserId = this.users
      .map((user, i) => (formValue.assignedUserId[i] ? user.id : null))
      .filter((id): id is number => id !== null);

    const task: Task = {
      id: this.taskId,
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      priority: formValue.priority,
      deadline: formValue.deadline,
      projectId: formValue.projectId,
      assignedUserId: selectedUserId,
    };

    if (this.isEditMode) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.addTask(task);
    }
    this.router.navigate(['/tasks']);
  }

  cancelTask() {
    this.router.navigate(['/tasks']);
  }
}
