import Query from './queries';
import Mutation from './mutations';
import customScalars from './customScalars';
import Court from './court';
import Schedule from './schedule';

const resolvers: any = {
  ...customScalars,
  Court,
  Schedule,

  Query,
  Mutation
};

export default resolvers;
