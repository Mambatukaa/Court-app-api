import { Model, model } from 'mongoose';
import {
  bookingSchema,
  IBooking,
  IBookingDocument
} from './defintions/booking';

export interface IBookingModel extends Model<IBookingDocument> {
  getBooking(_id: string): Promise<IBookingDocument>;
  createBooking(docFields: IBooking): Promise<IBookingDocument>;
}

const loadClass = () => {
  class Booking {
    public static async getBooking(_id) {
      return Bookings.findOne({ _id });
    }

    public static async createBooking(docFields: IBooking) {
      return Bookings.create({
        ...docFields,
        createdDate: new Date()
      });
    }
  }

  bookingSchema.loadClass(Booking);

  return bookingSchema;
};

loadClass();

const Bookings = model<IBookingDocument, IBookingModel>(
  'bookings',
  bookingSchema
);
