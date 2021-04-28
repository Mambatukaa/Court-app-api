import { Schedules } from '../../db/models';

export default {
  async courtSchedule(court) {
    const courtSchedule = await Schedules.find({
      courtId: court._id,
      startTime: { $gt: new Date().toISOString() },
    }).sort({ startTime: 1 });

    return courtSchedule;
  },
};
