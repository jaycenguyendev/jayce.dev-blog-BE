import config from '@/common/configs/index';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import baseExceptionHandler from './common/exceptions/handler/BaseExceptionHandler';
import { MsgIds, logger } from './common/logger/logger';
import { pgDatabase } from './databases/PgDatabase';
import router from './routes';
import http from 'http'; // Import the 'http' module

export class App {
  public app: express.Application;

  public server: http.Server;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.initializeErrorHandle();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeErrorHandle() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      baseExceptionHandler.handleError(err, res);
    });
  }

  routes() {
    this.app.use(config.contextPath, router);
  }

  closeServer() {
    if (this.server) {
      this.server.close();
    }
  }
}

const createInstance = async () => {
  // starting migrate to database
  await pgDatabase.connect();

  // Create instance app
  const instance = new App();

  const HOST = config.hostServer;
  const PORT = config.portServer;

  instance.server = instance.app.listen(PORT, () => {
    const parameters = { HOST, PORT: PORT.toString(), CONTEXT_PATH: config.contextPath };
    logger.writeWithParameter(MsgIds.M003001, parameters);
  });
  return instance;
};

export default createInstance;
