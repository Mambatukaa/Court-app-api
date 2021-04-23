import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { factoriesFactory } from './db/factories';

dotenv.config();

mongoose.Promise = global.Promise;

export const importData = async () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    mongoose.connection.db.dropDatabase();
  });

  await factoriesFactory();

  mongoose.connection.close();
};

importData();
