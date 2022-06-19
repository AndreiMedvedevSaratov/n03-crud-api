import { Server } from 'http';

export const stopServer = async (server: Server) => {
  return new Promise<void>((res) => {
    server.close(() => res());
  })
}
