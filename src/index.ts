import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import * as compression from 'compression';
import * as cors from 'cors';
import { connect } from './db/connection';
import { types, mutations, queries } from './data/schema';
import resolvers from './data/resolvers';
import { getEnv } from './data/utils';
import userMiddleware from './middlewares/userMiddleware';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

dotenv.config();

const MAIN_APP_DOMAIN = getEnv({ name: 'MAIN_APP_DOMAIN' });
const PORT = getEnv({ name: 'PORT' });

connect();

const app = express();

const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: [MAIN_APP_DOMAIN]
};

app.use(cors(corsOptions));
app.use(compression());

app.use(userMiddleware);

const typeDefs = gql`
  ${types}

  type Query {
    ${queries}
  }

  type Mutation {
    ${mutations}
  }
`;

httpServer.listen(PORT, (): void => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const user = req && req.user ? req.user : null;

      const requestInfo = {
        secure: req.secure,
        cookies: req.cookies
      };

      return {
        user,
        res,
        requestInfo
      };
    }
  });

  apolloServer.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  console.log(`\n🚀 GraphQL is now running on ${PORT}`);
});
