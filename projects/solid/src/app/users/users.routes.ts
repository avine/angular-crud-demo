import { Routes } from '@angular/router';
import { UserList, userListResolver } from 'common';
import { AddUser } from './add-user/add-user';
import { UpdateUser } from './update-user/update-user';
import { updateUserResolver } from './update-user/update-user-resolver';

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
    component: AddUser,
  },
  {
    path: 'update/:userId',
    component: UpdateUser,
    resolve: { user: updateUserResolver },
  },
];

export default routes;
