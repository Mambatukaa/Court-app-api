import { Bookings } from '../../../db/models';

const bookingQueries = {
  bookingDetail(_root, { _id }: { _id: string }) {
    return Bookings.getBooking(_id);
  }
};

export default bookingQueries;
