import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import * as compression from 'compression';
import * as cors from 'cors';
import { connect } from './db/connection';
import { types, mutations, queries } from './data/schema';
import resolvers from './data/resolvers';

const typeDefs = gql`
  ${types}

  type Query {
    ${queries}
  }

  type Mutation {
    ${mutations}
  }
`;

dotenv.config();

const { PORT } = process.env;

connect();

const app = express();

const httpServer = createServer(app);

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000']
};

app.use(cors(corsOptions));
app.use(compression());

httpServer.listen(PORT, (): void => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  console.log(`\n🚀      GraphQL is now running on ${PORT}`);
});
