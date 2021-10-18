import mongoose = require('mongoose');
import * as dotenv from 'dotenv';

dotenv.config();

// const { MONGO_URL } = process.env;

export const connectionOptions: any = {
  useNewUrlParser: true
};

mongoose.Promise = global.Promise;

export const connect = () => {
  return mongoose.connect(
    'mongodb://localhost:27017/court',
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
