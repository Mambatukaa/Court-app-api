import mongoose = require('mongoose');
import * as dotenv from 'dotenv';
import { getEnv } from '../data/utils';

dotenv.config();

const MONGO_URL = getEnv({ name: 'MONGO_URL' });

export const connectionOptions: any = {
  useNewUrlParser: true
};

mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect(
    MONGO_URL,
    {
      ...connectionOptions
    },
    () => {
      console.log('Mongo connected');
    }
  );
};

export const disconnect = () => {
  return mongoose.connection.close();
};
