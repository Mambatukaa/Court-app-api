import { Bookings } from '../../../db/models';
import { IBooking } from '../../../db/models/defintions/booking';
import { IContext } from '../../types';

const bookingMutations = {
  bookingsAdd(_root, args: IBooking, { user }: IContext) {
    return Bookings.createBooking(args, user._id);
  }
};

export default bookingMutations;
