import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
  createdDate: { type: Date, default: Date.now() },
  courtId: { type: String },
  startTime: Date,
  endTime: Date,
  price: String,
});

class Schedule {
  static async createSchedule(doc) {
    const schedule = this.create({
      createdDate: Date.now(),
      ...doc,
    });

    return schedule;
  }

  static async deleteSchedule(_id) {
    await this.deleteOne(_id);

    return 'deleted';
  }
}

scheduleSchema.loadClass(Schedule);

const Schedules = mongoose.model('schedules', scheduleSchema);

export default Schedules;
