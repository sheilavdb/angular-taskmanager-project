import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  userForm!: FormGroup;
  isEditMode = false;
  userId = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const users = this.userService.users();

    if (id) {
      const existing = users.find((u) => u.id === +id);
      if (existing) {
        this.isEditMode = true;
        this.userId = existing.id;
        this.initForm(existing);
        return;
      }
    }
    this.userId = Math.max(0, ...users.map((u) => u.id)) + 1;
    this.initForm();
  }
  initForm(user?: User) {
    this.userForm = this.fb.group({
      name: [user?.name || '', Validators.required],
      role: [user?.role || '', Validators.required],
      email: [user?.email || '', Validators.required],
    });
  }

  saveUser() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    const newUser: User = {
      id: this.userId,
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
    };

    if (this.isEditMode) {
      this.userService.updateUser(newUser);
    } else {
      this.userService.addUser(newUser);
    }

    this.router.navigate(['/users']);
  }
}
