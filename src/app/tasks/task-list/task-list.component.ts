import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../service/task.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService, User } from '../../service/user.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReusableCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  users: User[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.users();
  }

  get tasks() {
    return this.taskService.tasks();
  }

  getUserNames(memberIds: number[]): string {
    const userNames = this.users
      .filter((user) => memberIds.includes(user.id))
      .map((user) => user.name);
    return userNames.join(', ');
  }

  update(task: Task) {
    this.taskService.updateTask(task);
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
  }
}
