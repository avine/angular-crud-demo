import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/list',
  },
];
