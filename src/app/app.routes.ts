import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/new', component: ProjectFormComponent },
      { path: 'projects/edit/:id', component: ProjectFormComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'users', component: UserListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
