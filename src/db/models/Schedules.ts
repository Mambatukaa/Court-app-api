import { Model, model } from 'mongoose';
import {
  ISchedule,
  IScheduleDocument,
  scheduleSchema
} from './defintions/schedule';

export interface IScheduleModel extends Model<IScheduleDocument> {
  getSchedule(_id: string): Promise<IScheduleDocument>;
  createSchedule(docFields: ISchedule): Promise<IScheduleDocument>;
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

    public static async createSchedule(docFields: ISchedule) {
      return Schedules.create({
        ...docFields
      });
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
