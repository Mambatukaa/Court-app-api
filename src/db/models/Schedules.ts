import { Model, model } from 'mongoose';
import { IScheduleDocument, scheduleSchema } from './defintions/schedule';

export interface IScheduleModel extends Model<IScheduleDocument> {
  getSchedule(_id: string): Promise<IScheduleDocument>;
}

const loadClass = () => {
  class Schedule {
    public static async getSchedule(_id: string) {
      const schedule = await Schedules.findOne({ _id });

      if (!schedule) {
        throw new Error('Schedule not found');
      }

      return schedule;
    }
  }

  scheduleSchema.loadClass(Schedule);

  return scheduleSchema;
};

loadClass();

const Schedules = model<IScheduleDocument, IScheduleModel>(
  'schedules',
  scheduleSchema
);

export default Schedules;
