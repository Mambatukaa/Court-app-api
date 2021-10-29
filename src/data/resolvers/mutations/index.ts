import courts from './courts';
import users from './users';
import bookings from './bookings';

export default {
  ...courts,
  ...users,
  ...bookings
};
