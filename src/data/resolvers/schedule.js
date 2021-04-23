import { Bookings, Courts } from '../../db/models';

export default {
  async bookedPeople(schedule) {
    const bookedPeople = await Bookings.find({
      scheduleId: schedule._id,
    }).count();

    return bookedPeople;
  },

  async scheduledCourt(schedule) {
    return await Courts.findOne({ _id: schedule.courtId });
  },
};
