import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { ReusableCardComponent } from '../../shared/reusable-card/reusable-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReusableCardComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  get users() {
    return this.userService.users;
  }

  delete(id: number) {
    this.userService.deleteUser(id);
  }
}
