import mongoose from 'mongoose';

const courtSchema = mongoose.Schema({
  createdDate: { type: Date, default: Date.now() },
  searchText: { type: String },
  name: { type: String },
  ownerId: { type: String },
  image: String, // olon zurag bna
  location: {
    lat: Number,
    lng: Number,
  },
  slotSize: Number,
  description: {
    type: String,
    trim: true,
  },
  warning: {
    type: String,
  },
  parking: { type: String },
  courtDetail: { type: String },
});

class Court {
  /** Create Court */
  static async createCourt(doc) {
    const court = this.create({
      createdDate: Date.now(),
      searchText: doc.name,
      location: {
        lat: doc.lat,
        lng: doc.lng,
      },
      ...doc,
    });
    return court;
  }

  /** Update Court */
  static async editCourt(_id, doc) {
    await this.updateOne({ _id }, { $set: { ...doc } });

    return this.findById(_id);
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
