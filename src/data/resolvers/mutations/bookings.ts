import { Bookings } from '../../../db/models';
import { IBooking } from '../../../db/models/defintions/booking';

const bookingMutations = {
  bookingsAdd(_root, args: IBooking) {
    return Bookings.createBooking(args);
  }
};

export default bookingMutations;
