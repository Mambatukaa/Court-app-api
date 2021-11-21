import * as express from 'express';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import * as compression from 'compression';
import * as cors from 'cors';
import { connect } from './db/connection';
import { getEnv } from './data/utils';
import userMiddleware from './middlewares/userMiddleware';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { initApolloServer } from './apolloClient';

dotenv.config();

const { JWT_TOKEN_SECRET } = process.env;

if (!JWT_TOKEN_SECRET) {
  throw new Error('Please configure JWT_TOKEN_SECRET in environment variable.');
}

// const MAIN_APP_DOMAIN = getEnv({ name: 'MAIN_APP_DOMAIN' });
const PORT = getEnv({ name: 'PORT' });

connect();

const app = express();

const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
};

app.use(cors(corsOptions));
app.use(compression());

app.use(userMiddleware);

httpServer.listen(PORT, (): void => {
  initApolloServer().then(apolloServer =>
    apolloServer.applyMiddleware({ app, path: '/graphql', cors: corsOptions })
  );

  console.log(`\n🚀 GraphQL is now running on ${PORT}`);
});
