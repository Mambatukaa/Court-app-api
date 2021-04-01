import Courts from '../../../db/models/Court';

const courtQueries = {
  async courtDetail(root, { _id }) {
    return Courts.courtDetail(_id);
  },

  /** All courts */
  async allCourts() {
    return Courts.find();
  }
};

export default courtQueries;
