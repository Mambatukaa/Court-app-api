import { Schema } from 'mongoose';
import { field } from './utils';

export interface IBooking {
  scheduleId: string;
  courtId: string;

  createdDate: Date;
  createdBy: string;
}

export interface IBookingDocument extends IBooking {
  _id: string;
}

export const bookingSchema = new Schema({
  _id: field({ pkey: true }),
  scheduleId: field({ type: String, label: 'Schedule' }),
  courtId: field({ type: String, label: 'Court' }),

  createdDate: field({ type: Date, label: 'Created Date' }),
  createdBy: field({ type: String, label: 'Created by' })
});
