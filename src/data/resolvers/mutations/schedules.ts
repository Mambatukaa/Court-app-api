import { Schedules } from '../../../db/models';
import { ISchedule } from '../../../db/models/defintions/schedule';

const scheduleMutations = {
  schedulesAdd(_root, args: ISchedule) {
    return Schedules.createSchedule(args);
  }
};

export default scheduleMutations;
