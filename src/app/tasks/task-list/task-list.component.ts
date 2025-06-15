import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../service/task.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { DaysLeftPipe } from '../../shared/days-left.pipe';
import { DaysLeftColorPipe } from '../../shared/days-left-color.pipe';
import { HoverTooltipDirective } from '../../shared/hover-tooltip.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReusableCardComponent,
    MatButtonModule,
    MatIconModule,
    DaysLeftPipe,
    DaysLeftColorPipe,
    HoverTooltipDirective,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Signal<Task[]>;
  selectedUserId: number | '' = '';
  sortBy: '' | 'status' | 'deadline' = '';

  constructor(
    private taskService: TaskService,
    public userService: UserService
  ) {
    this.tasks = this.taskService.tasks;
  }

  get filteredTasks(): Task[] {
    let result = this.tasks();

    // Filter by selected user
    if (this.selectedUserId !== '') {
      result = result.filter((task) =>
        task.assignedUserId?.includes(Number(this.selectedUserId))
      );
    }

    // Sort by selected criteria
    if (this.sortBy === 'status') {
      result = result.slice().sort((a, b) => a.status.localeCompare(b.status));
    } else if (this.sortBy === 'deadline') {
      result = result
        .slice()
        .sort(
          (a, b) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
    }

    return result;
  }

  getUserNames(memberIds: number[]): string {
    const userNames = this.userService
      .users()
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

  complete(taskId: number) {
    this.taskService.completeTask(taskId);
  }
}
