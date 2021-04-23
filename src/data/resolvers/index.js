import customScalars from './customScalars';
import Court from './court';
import Schedule from './schedule';
import Mutation from './mutations';
import Query from './queries';

export default {
  ...customScalars,
  Court,
  Schedule,
  Mutation,
  Query,
};
