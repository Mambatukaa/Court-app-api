import { ApolloServer, gql } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import resolvers from './data/resolvers';
import { types, queries, mutations } from './data/schema/court';
// import resolvers from './data/resolvers';

// load environment variables
dotenv.config();

// const { NODE_ENV } = process.env;

// let playground: PlaygroundConfig = false;

// if (NODE_ENV !== 'production') {
//   playground = {
//     settings: {
//       'general.betaUpdates': false,
//       'editor.theme': 'dark',
//       'editor.reuseHeaders': true,
//       'tracing.hideTracingResponse': true,
//       'editor.fontSize': 14,
//       'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
//       'request.credentials': 'include'
//     }
//   };
// }

let apolloServer;

export const initApolloServer = () => {
  const typeDefs = gql(`
      ${types}
    type Query {
      ${queries}
    }
    type Mutation {
      ${mutations}
    }
  `);

  apolloServer = new ApolloServer({
    typeDefs,
    resolvers
    // playground,
    // uploads: false,
  });

  return apolloServer;
};

export default apolloServer;
