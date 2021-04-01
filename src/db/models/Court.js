import mongoose from 'mongoose';

const courtSchema = mongoose.Schema({
  createdDate: { type: Date, default: Date.now() },
  name: { type: String, unique: true },
  shortName: { type: String },
  ownerId: { type: String },
  images: [String],
  price: { type: Number },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number
    }
  ],
  description: {
    type: String,
    trim: true
  },
  warning: {
    type: String
  }
});

class Court {
  /** Create Court */
  static async createCourt(doc) {
    const court = this.create({
      createdDate: Date.now(),
      ...doc
    });
    return court;
  }

  /** Update Court */
  static async editCourt(_id, doc) {
    return this.updateOne({ _id }, { $set: { ...doc } });
  }

  /** Remove Court */
  static async removeCourt(_id) {
    const deleted = this.deleteOne({ _id });

    return deleted;
  }

  /** Get court detail */
  static async courtDetail(_id) {
    const courtDetail = await this.findOne({ _id });
    return courtDetail;
  }
}

courtSchema.loadClass(Court);

const Courts = mongoose.model('courts', courtSchema);

export default Courts;
