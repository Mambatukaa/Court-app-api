import user from './user';
import court from './court';
import schedule from './schedule';
import booking from './booking';

export default {
  ...user,
  ...court,
  ...schedule,
  ...booking,
};
