import request from 'supertest';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { server } from '..';
import { stopServer } from './testUtils';

describe('Сценарий 2', () => {

  it('Server should answer with status code 200', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
  });

  it('Server should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
    const res = await request(server)
      .post(`/api/users`)
      .send({ username: 'GreatAndrei', hobbies: [] });

    expect(res.statusCode).toBe(400);
  });

  it('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const UUIDV = uuidv4();
    const id = uuidv5('GreatAndrei', UUIDV);
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(400);
  });

  afterAll(async () => {
    await stopServer(server);
  });

});
