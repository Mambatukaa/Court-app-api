import { Schedules } from '../../../db/models';

const scheduleMutations = {
  /**
   * Schedule add
   */

  async schedulesAdd(_root, doc) {
    const schedule = await Schedules.createSchedule(doc);

    return schedule;
  },

  /** S0chedule delete */
  async schedulesDelete(_root, _id) {
    return await Schedules.deleteSchedule(_id);
  },
};

export default scheduleMutations;
