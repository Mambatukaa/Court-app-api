import Query from './queries';
import Mutation from './mutations';
import customScalars from './customScalars';

const resolvers: any = {
  ...customScalars,

  Query,
  Mutation
};

export default resolvers;
