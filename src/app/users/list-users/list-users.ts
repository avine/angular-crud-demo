import { Component, inject, model, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { UserService } from '../shared/user-service';
import { User } from '../shared/user-types';

@Component({
  selector: 'app-list-users',
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatTooltipModule, RouterLink],
  templateUrl: './list-users.html',
  styleUrl: './list-users.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ListUsers {
  #userService = inject(UserService);

  users = model.required<User[]>();

  protected displayedColumns: (keyof User | 'actions')[] = [
    'firstName',
    'lastName',
    'email',
    'actions',
  ];

  protected delete(userId: number) {
    this.#userService
      .deleteById(userId)
      .subscribe(() => this.users.update((users) => users.filter(({ id }) => id !== userId)));
  }
}
