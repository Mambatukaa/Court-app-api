import { Schema } from 'mongoose';
import { commonFields, ICommonFields } from './courts';
import { field } from './utils';

export interface IBooking {
  scheduleId: string;
  courtId: string;
  isActive: boolean;
}

export interface IBookingDocument extends ICommonFields, IBooking {
  _id: string;
}

export const bookingSchema = new Schema({
  _id: field({ pkey: true }),
  scheduleId: field({ type: String, label: 'Schedule' }),
  courtId: field({ type: String, label: 'Court' }),
  isActive: field({ type: Boolean, label: 'Is active' }),
  ...commonFields
});
