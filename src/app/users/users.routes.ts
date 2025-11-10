import { Routes } from '@angular/router';
import { UserList, userListResolver } from 'common';
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
    component: UserList,
    resolve: { users: userListResolver },
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
