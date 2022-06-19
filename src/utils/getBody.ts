import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../models/user';
import { forwardJson } from './helpers';

export async function getBody(
  req: IncomingMessage,
  res: ServerResponse
): Promise<IUser> {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.setEncoding('utf8');

      req
        .on('data', (chunk) => {
          body += chunk;
        })
        .on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            forwardJson(500, { message: 'Oops, something went wrong.' }, res);
            reject(error);
          }
        })
    } catch (error) {
      forwardJson(500, { message: 'Oops, something went wrong.' }, res);
      reject(error);
    }
  })
}
