import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id?: string
  username: string
  age: number
  hobbies: string[] | []
}

let users: IUser[] = [];

export function findAll(): Promise<IUser[]> {
  return new Promise((res) => {
    res(users);
  });
}

export function findById(id: string): Promise<IUser | undefined> {
  return new Promise((res) => {
    const foundUser = users.find((user) => user.id === id);

    res(foundUser);
  })
}

export function create(newUser: IUser): Promise<IUser> {
  return new Promise((res) => {
    const createdUser = { id: uuidv4(), ...newUser };

    users.push(createdUser);

    res(createdUser);
  })
}

export function updateById(id: string, updateUser: IUser): Promise<IUser> {
  return new Promise((res) => {
    const index = users.findIndex((user) => user.id === id);

    users[index] = { id, ...updateUser };

    res(users[index]);
  })
}

export function deleteById(id: string): Promise<true> {
  return new Promise((res) => {
    users = users.filter((user) => user.id !== id);

    res(true);
  })
}
