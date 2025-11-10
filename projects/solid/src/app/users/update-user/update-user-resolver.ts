import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { User, UserService } from 'common';
import { map } from 'rxjs';

export const updateUserResolver: ResolveFn<User | RedirectCommand> = (route) => {
  const router = inject(Router);

  return inject(UserService)
    .getById(Number(route.params['userId']))
    .pipe(map((user) => user ?? new RedirectCommand(router.parseUrl('/'))));
};
