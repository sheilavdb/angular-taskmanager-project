import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReusableCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor(private taskService: TaskService) {}

  get tasks() {
    return this.taskService.tasks();
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
  }
}
