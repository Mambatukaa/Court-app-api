import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
  createdDate: { type: Date, default: Date.now() },

  courtId: { type: String },
  day: Date,
  startTime: String,
  endTime: String,
});

class Schedule {
  static async createSchedule(doc) {
    const schedule = this.create({
      createdDate: Date.now(),
      ...doc,
    });

    return schedule;
  }
}

scheduleSchema.loadClass(Schedule);

const Schedules = mongoose.model('schedules', scheduleSchema);

export default Schedules;
