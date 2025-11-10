import { Routes } from '@angular/router';
import { AddUser } from './add-user/add-user';
import { ListUsers } from './list-users/list-users';
import { listUsersResolver } from './list-users/list-users-resolver';
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
    component: ListUsers,
    resolve: { users: listUsersResolver },
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
