import { Bookings } from '../../../db/models';

const bookingQueries = {
  async bookingDetails(_root, doc) {
    return await Bookings.find(doc);
  },
};

export default bookingQueries;
