import { Bookings, Courts } from '../../db/models';
import { IScheduleDocument } from '../../db/models/defintions/schedule';

export default {
  bookedPeople(schedule: IScheduleDocument) {
    return Bookings.find({ scheduleId: schedule._id }).countDocuments();
  },

  scheduledCourt(schedule: IScheduleDocument) {
    return Courts.getCourt(schedule.courtId);
  }
};
