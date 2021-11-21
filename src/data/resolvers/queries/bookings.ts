import { Bookings } from '../../../db/models';

const bookingQueries = {
  bookingDetail(_root, { _id }: { _id: string }) {
    return Bookings.getBooking(_id);
  },
  userBookings(_root, { userId }: { userId: string }) {
    return Bookings.find({ createdBy: userId });
  }
};

export default bookingQueries;
