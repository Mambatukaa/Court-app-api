import { Schedules } from '../../db/models';

export default {
  async courtSchedule(court) {
    const courtSchedule = await Schedules.find({
      courtId: court._id,
      day: { $gt: new Date().toISOString() },
    });

    return courtSchedule;
  },
};
