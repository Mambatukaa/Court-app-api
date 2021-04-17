import { Bookings } from '../../../db/models';

const bookingMutations = {
  /**
   * Booking add
   */

  async bookingAdd(_root, { ...doc }) {
    return await Bookings.createBooking(doc);
  },
};

export default bookingMutations;
