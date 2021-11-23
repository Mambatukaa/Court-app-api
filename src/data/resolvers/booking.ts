import { Courts, Schedules } from '../../db/models';
import { IBookingDocument } from '../../db/models/defintions/booking';

export default {
  court(booking: IBookingDocument) {
    return Courts.findOne({ _id: booking.courtId });
  },

  schedule(booking: IBookingDocument) {
    return Schedules.findOne({ _id: booking.scheduleId });
  }
};
