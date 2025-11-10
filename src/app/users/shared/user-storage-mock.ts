import { HttpErrorResponse } from '@angular/common/http';
import { delay, mergeMap, Observable, of, throwError } from 'rxjs';
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

const _DELAY = 100;

const _valueAsObservable = <T>(value: T): Observable<T> => of(value).pipe(delay(_DELAY));

const _unauthorizedAsObservable = (error: string): Observable<never> =>
  of('whatever').pipe(
    delay(_DELAY),
    mergeMap(() =>
      throwError(() => new HttpErrorResponse({ error, status: 401, statusText: 'Unauthorized' })),
    ),
  );

export const fetchAllUsers = () => _valueAsObservable(_USERS);

export const getUserById = (userId: number) =>
  _valueAsObservable(_USERS.find(({ id }) => id === userId) ?? null);

const isForbiddenEmail = (userEmail: string, userId?: number) =>
  !!_USERS.find(({ email, id }) => email === userEmail && id !== userId);

export const addUser = (user: Omit<User, 'id'>) => {
  if (isForbiddenEmail(user.email)) {
    return _unauthorizedAsObservable('Email already exists');
  }
  const newUser: User = { ..._getNewId(), ...user };
  _USERS = [..._USERS, newUser];
  return _valueAsObservable(newUser);
};

export const updateUser = (user: User) => {
  if (isForbiddenEmail(user.email, user.id)) {
    return _unauthorizedAsObservable('Email already exists');
  }
  const index = _USERS.findIndex(({ id }) => id === user.id);
  if (index === -1) {
    return _valueAsObservable(false);
  }
  _USERS = [..._USERS];
  _USERS[index] = user;
  return _valueAsObservable(true);
};

export const deleteUserById = (userId: number) => {
  const index = _USERS.findIndex(({ id }) => id === userId);
  if (index === -1) {
    return _valueAsObservable(false);
  }
  _USERS = [..._USERS];
  _USERS.splice(index, 1);
  return _valueAsObservable(true);
};
