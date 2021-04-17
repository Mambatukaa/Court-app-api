import user from './user';
import court from './court';
import booking from './booking';
import schedule from './schedule';

export default {
  ...user,
  ...court,
  ...booking,
  ...schedule,
};
