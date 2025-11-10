import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage, User, UserForm, UserService } from 'common';

@Component({
  selector: 'app-add-user',
  imports: [ErrorMessage, UserForm],
  templateUrl: './add-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class AddUser {
  #router = inject(Router);

  #userService = inject(UserService);

  protected formDisabled = signal(false);

  protected errorMessage = signal<string | undefined>(undefined);

  protected submit(user: Omit<User, 'id'>) {
    this.formDisabled.set(true);
    this.errorMessage.set(undefined);

    this.#userService.add(user).subscribe({
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
