import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';
import { UserForm } from './user-form/user-form';

@Component({
  selector: 'app-upsert-user',
  imports: [UserForm],
  templateUrl: './upsert-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class UpsertUser {
  #router = inject(Router);

  #userService = inject(UserService);

  title = input.required<string>();

  user = input<User>();

  protected submit(user: Omit<User, 'id'>) {
    const id = this.user()?.id;

    const action$: Observable<unknown> = !id
      ? this.#userService.add(user)
      : this.#userService.update({ id, ...user });

    return action$.subscribe(() => this.#router.navigate(['/users/list']));
  }
}
