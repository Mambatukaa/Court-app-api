import { Model, model } from 'mongoose';
import {
  bookingSchema,
  IBooking,
  IBookingDocument
} from './defintions/booking';

export interface IBookingModel extends Model<IBookingDocument> {
  getBooking(_id: string): Promise<IBookingDocument>;
  createBooking(docFields: IBooking, userId: string): Promise<IBookingDocument>;
}

const loadClass = () => {
  class Booking {
    public static async getBooking(_id) {
      const booking = await Bookings.findOne({ _id });

      if (!booking) {
        throw new Error('Booking not found');
      }

      return booking;
    }

    public static async createBooking(docFields: IBooking, userId: string) {
      if (!userId) {
        throw new Error('userId must be supplied');
      }

      return Bookings.create({
        ...docFields,
        isActive: true,
        createdDate: new Date(),
        createdBy: userId
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

export default Bookings;
