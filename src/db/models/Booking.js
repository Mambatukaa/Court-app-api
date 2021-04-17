import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  createdDate: { type: Date, default: Date.now() },
  userId: { type: String },
  courtId: { type: String },
  date: { type: Date },
  status: { type: String },
});

class Booking {
  /**
   * Create booking
   */
  static async createBooking(doc) {
    const booking = this.create({
      createdDate: Date.now(),
      ...doc,
    });

    return booking;
  }
}

bookingSchema.loadClass(Booking);

const Bookings = mongoose.model('bookings', bookingSchema);

export default Bookings;
