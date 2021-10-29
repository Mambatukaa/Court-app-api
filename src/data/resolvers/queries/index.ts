import courts from './courts';
import users from './users';
import bookings from './bookings';
import schedules from './schedules';

export default {
  ...courts,
  ...users,
  ...bookings,
  ...schedules
};
