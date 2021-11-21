import { Schedules } from '../../../db/models';

const scheduleQueries = {
  scheduleDetail(_root, { _id }: { _id: string }) {
    return Schedules.getSchedule(_id);
  },

  schedulesMain(_root, { courtId, ids }: { courtId: string; ids: string[] }) {
    const filter: any = {};

    if (ids) {
      filter._id = { $in: ids };
    }

    if (courtId) {
      filter.courtId = courtId;
    }

    return Schedules.find(filter);
  }
};

export default scheduleQueries;
