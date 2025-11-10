import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../user/user-service';
import { User } from '../user/user-types';

export const userListResolver: ResolveFn<User[]> = () => inject(UserService).fetchAll();
