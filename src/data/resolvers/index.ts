import Court from './court';
import Query from './queries';
import Mutation from './mutations';
import customScalars from './customScalars';

const resolvers: any = {
  ...customScalars,

  Court,
  Query,
  Mutation
};

export default resolvers;
