import { IncomingMessage, ServerResponse } from 'http';
import { getBody } from '../utils/getBody';
import { forwardJson } from '../utils/helpers';
import * as User from '../models/user';

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const foundUsers = await User.findAll();

    forwardJson(200, foundUsers, res);

  } catch (error) {
    forwardJson(500, { message: 'Oops, something went wrong.' }, res);
  }
}

export async function getUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id);

    if (!foundUser) return forwardJson(404, { message: 'User not found' }, res);

    forwardJson(200, foundUser, res);

  } catch (error) {
    forwardJson(500, { message: 'Oops, something went wrong.' }, res);
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getBody(req, res);
    const { username, age, hobbies } = body;

    if (!username || !age || !hobbies)
      return forwardJson(400, { message: 'Body does not contain required fields' }, res);

    const newUser = {
      username,
      age,
      hobbies,
    }

    const createdNewUser = await User.create(newUser);

    forwardJson(201, createdNewUser, res);

  } catch (error) {
    forwardJson(500, { message: 'Oops, something went wrong.', }, res);
  }
}

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id);

    if (!foundUser) return forwardJson(404, { message: 'User not found' }, res);

    const body = await getBody(req, res);
    const { username, age, hobbies } = body;

    const updateUser = {
      username: username || foundUser.username,
      age: age || foundUser.age,
      hobbies: hobbies || foundUser.hobbies,
    }

    const updatedUser = await User.updateById(id, updateUser);

    forwardJson(200, updatedUser, res);

  } catch (error) {
    forwardJson(500, { message: 'Oops, something went wrong.' }, res);
  }
}

export async function deleteUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id);

    if (!foundUser) return forwardJson(404, { message: 'User not found' }, res);

    forwardJson(204, { message: `User ${id} deleted` }, res);

    await User.deleteById(id);

  } catch (error) {
    forwardJson(500, { message: 'Oops, something went wrong.' }, res);
  }
}