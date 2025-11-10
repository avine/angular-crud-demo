import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '../shared/user-form/user-form';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

@Component({
  selector: 'app-add-user',
  imports: [UserForm],
  templateUrl: './add-user.html',
  encapsulation: ViewEncapsulation.None,
})
export class AddUser {
  #router = inject(Router);

  #userService = inject(UserService);

  protected submit(user: Omit<User, 'id'>) {
    this.#userService.add(user).subscribe(() => this.#router.navigate(['/users/list']));
  }
}
