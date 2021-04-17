import { Schedules } from '../../../db/models';

const scheduleMutations = {
  /**
   * Schedule add
   */

  async schedulesAdd(_root, doc) {
    const schedule = await Schedules.createSchedule(doc);

    return schedule;
  },
};

export default scheduleMutations;
