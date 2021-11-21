import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { getEnv } from './data/utils';
import { factoriesFactory } from './db/factories';

dotenv.config();

const MONGO_URL = getEnv({ name: 'MONGO_URL' });

const loadData = async () => {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true }).then(() => {
    mongoose.connection.db.dropDatabase();
  });

  await factoriesFactory();

  mongoose.connection.close();
};

loadData();
