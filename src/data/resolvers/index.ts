import Query from './queries';
import Mutation from './mutations';
import customScalars from './customScalars';
import Court from './court';
import Schedule from './schedule';
import Booking from './booking';

const resolvers: any = {
  ...customScalars,
  Court,
  Schedule,
  Booking,

  Query,
  Mutation
};

export default resolvers;
