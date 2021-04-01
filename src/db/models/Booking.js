import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  userId: { type: String },
  courtId: { type: String },
  date: { type: Date }
});

class Booking {}

bookingSchema.loadClass(Booking);

const Bookings = mongoose.model('bookings', bookingSchema);

export default Bookings;
