import { delay, of } from 'rxjs';
import { User } from './user-types';

let _USERS: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@demo.com',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@demo.com',
  },
];

let _ID = 2;

const _getNewId = (): Pick<User, 'id'> => {
  _ID += 1;
  return { id: _ID };
};

export const fetchAllUsers = () => of(_USERS).pipe(delay(100));

export const getUserById = (userId: number) =>
  of(_USERS.find(({ id }) => id === userId) ?? null).pipe(delay(100));

export const addUser = (user: Omit<User, 'id'>) => {
  const newUser: User = { ..._getNewId(), ...user };
  _USERS = [..._USERS, newUser];
  return of(newUser).pipe(delay(100));
};

export const updateUser = (user: User) => {
  const index = _USERS.findIndex(({ id }) => id === user.id);
  if (index === -1) {
    return of(false).pipe(delay(100));
  }
  _USERS = [..._USERS];
  _USERS[index] = user;
  return of(true).pipe(delay(100));
};

export const deleteUserById = (userId: number) => {
  const index = _USERS.findIndex(({ id }) => id === userId);
  if (index === -1) {
    return of(false).pipe(delay(100));
  }
  _USERS = [..._USERS];
  _USERS.splice(index, 1);
  return of(true).pipe(delay(100));
};
