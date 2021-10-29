import { Schedules } from '../../../db/models';
import { ISchedule } from '../../../db/models/defintions/schedule';
import { IContext } from '../../types';

const scheduleMutations = {
  schedulesAdd(_root, args: ISchedule, { user }: IContext) {
    return Schedules.createSchedule(args, user._id);
  }
};

export default scheduleMutations;
