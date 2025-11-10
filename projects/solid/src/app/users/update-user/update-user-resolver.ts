import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

export const updateUserResolver: ResolveFn<User | RedirectCommand> = (route) => {
  const router = inject(Router);

  return inject(UserService)
    .getById(Number(route.params['userId']))
    .pipe(map((user) => user ?? new RedirectCommand(router.parseUrl('/'))));
};
