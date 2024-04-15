import dotenv from 'dotenv';
import 'reflect-metadata';
import createInstance from './app';
import { MsgIds, logger } from './common/logger/logger';

dotenv.config();
createInstance().catch((err) => {
  logger.writeWithError(MsgIds.M003002, err);
});
