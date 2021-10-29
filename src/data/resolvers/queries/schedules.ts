import { Bookings } from '../../../db/models';

const scheduleQueries = {
  scheduleDetail(_root, { _id }: { _id: string }) {
    return Bookings.getBooking(_id);
  }
};

export default scheduleQueries;
