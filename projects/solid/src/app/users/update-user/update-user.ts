import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '../shared/user-form/user-form';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

@Component({
  selector: 'app-update-user',
  imports: [UserForm],
  templateUrl: './update-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class UpdateUser {
  #router = inject(Router);

  #userService = inject(UserService);

  user = input.required<User>();

  protected submit(user: Omit<User, 'id'>) {
    this.#userService
      .update({ id: this.user().id, ...user })
      .subscribe(() => this.#router.navigate(['/users/list']));
  }
}
