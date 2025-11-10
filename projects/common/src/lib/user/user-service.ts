import { Injectable } from '@angular/core';
import {
  addUser,
  deleteUserById,
  fetchAllUsers,
  getUserById,
  updateUser,
} from './_user-storage-mock';
import { User } from './user-types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fetchAll() {
    return fetchAllUsers();
  }

  getById(userId: number) {
    return getUserById(userId);
  }

  add(user: Omit<User, 'id'>) {
    return addUser(user);
  }

  update(user: User) {
    return updateUser(user);
  }

  deleteById(userId: number) {
    return deleteUserById(userId);
  }
}
