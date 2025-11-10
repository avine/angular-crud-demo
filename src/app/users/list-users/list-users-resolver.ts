import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

export const listUsersResolver: ResolveFn<User[]> = () => inject(UserService).fetchAll();
