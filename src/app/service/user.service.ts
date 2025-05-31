import { Injectable, signal } from '@angular/core';

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
  // Private signal holding the array of users
  private _users = signal<User[]>([
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'Developer',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      role: 'Designer',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      role: 'Manager',
    },
  ]);

  // Expose readonly signal for safety
  users = this._users.asReadonly();

  // Add a new user
  addUser(user: User) {
    this._users.update((users) => [...users, user]);
  }

  // Update existing user by id
  updateUser(updatedUser: User) {
    this._users.update((users) =>
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }

  // Delete user by id
  deleteUser(id: number) {
    this._users.update((users) => users.filter((u) => u.id !== id));
  }

  getUserById(id: number): User | undefined {
    return this._users().find((u) => u.id === id);
  }
}
