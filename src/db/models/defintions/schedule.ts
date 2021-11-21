import { Schema } from 'mongoose';
import { field } from './utils';

export interface ISchedule {
  startDate: Date;
  endDate: Date;
  price: number;
  courtId: string;
}

export interface IScheduleDocument extends ISchedule {
  _id: string;
}

export const scheduleSchema = new Schema({
  _id: field({ pkey: true }),
  startDate: field({ type: Date, label: 'Start time' }),
  endDate: field({ type: Date, label: 'End time' }),
  price: field({ type: Number, label: 'Price' }),
  courtId: field({ type: String, label: 'Court' })
});
