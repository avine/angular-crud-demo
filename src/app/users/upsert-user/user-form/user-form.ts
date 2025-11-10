import { Component, effect, inject, input, output, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/user-types';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserForm {
  user = input<Omit<User, 'id'>>();

  userChange = output<Omit<User, 'id'>>();

  protected userForm = inject(NonNullableFormBuilder).group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  protected submit() {
    const userValue = this.userForm.value as Required<typeof this.userForm.value>;
    this.userChange.emit(userValue);
  }
}
