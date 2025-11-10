import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../error-message/error-message';
import { UserForm } from '../shared/user-form/user-form';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

@Component({
  selector: 'app-update-user',
  imports: [ErrorMessage, UserForm],
  templateUrl: './update-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class UpdateUser {
  #router = inject(Router);

  #userService = inject(UserService);

  user = input.required<User>();

  protected formDisabled = signal(false);

  protected errorMessage = signal<string | undefined>(undefined);

  protected submit(user: Omit<User, 'id'>) {
    this.formDisabled.set(true);
    this.errorMessage.set(undefined);

    this.#userService.update({ id: this.user().id, ...user }).subscribe({
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
