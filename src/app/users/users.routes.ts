import { Routes } from '@angular/router';
import { ListUsers } from './list-users/list-users';
import { listUsersResolver } from './list-users/list-users-resolver';
import { updateUserResolver } from './upsert-user/update-user-resolver';
import { UpsertUser } from './upsert-user/upsert-user';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: ListUsers,
    resolve: { users: listUsersResolver },
  },
  {
    path: 'add',
    component: UpsertUser,
    data: { title: 'Add user' },
  },
  {
    path: 'update/:userId',
    component: UpsertUser,
    resolve: { user: updateUserResolver },
    data: { title: 'Update user' },
  },
];

export default routes;
