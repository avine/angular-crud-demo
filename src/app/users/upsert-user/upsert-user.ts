import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../shared/error-message/error-message';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';
import { UserForm } from './user-form/user-form';

@Component({
  selector: 'app-upsert-user',
  imports: [ErrorMessage, UserForm],
  templateUrl: './upsert-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class UpsertUser {
  #router = inject(Router);

  #userService = inject(UserService);

  title = input.required<string>();

  user = input<User>();

  protected formDisabled = signal(false);

  protected errorMessage = signal<string | undefined>(undefined);

  protected submit(user: Omit<User, 'id'>) {
    const id = this.user()?.id;

    const action$: Observable<unknown> = !id
      ? this.#userService.add(user)
      : this.#userService.update({ id, ...user });

    this.formDisabled.set(true);
    this.errorMessage.set(undefined);

    return action$.subscribe({
      next: () => {
        this.#router.navigate(['/users/list']);
      },
      error: ({ error }: HttpErrorResponse) => {
        this.formDisabled.set(false);
        this.errorMessage.set(error);
      },
    });
  }
}
