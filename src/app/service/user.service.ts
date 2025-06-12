import { Injectable } from '@angular/core';
import { DataService } from './data.service';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Developer' | 'Designer' | 'Manager';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users;

  constructor(private dataService: DataService) {
    this.users = this.dataService.users;
  }

  addUser(user: User) {
    this.dataService.addUser(user);
  }

  updateUser(user: User) {
    this.dataService.updateUser(user);
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id);
  }

  getUserById(id: number): User | undefined {
    return this.dataService.users().find((u) => u.id === id);
  }
}
