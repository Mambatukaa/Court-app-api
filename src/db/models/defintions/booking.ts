import { Schema } from 'mongoose';
import { commonFields, ICommonFields } from './courts';
import { field } from './utils';

export interface IBooking {
  scheduleId: string;
  userId: string;
  status: string;
}

export interface IBookingDocument extends ICommonFields, IBooking {
  _id: string;
}

export const bookingSchema = new Schema({
  _id: field({ pkey: true }),
  scheduleId: field({ type: String, label: 'Schedule' }),
  userId: field({ type: String, label: 'User' }),
  status: field({ type: String, label: 'Status' }),
  ...commonFields
});
