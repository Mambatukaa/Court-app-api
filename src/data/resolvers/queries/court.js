import Courts from '../../../db/models/Court';

const generateFilter = async params => {
  const filter = {};

  if (params.searchValue) {
    filter.searchText = { $in: [new RegExp(`.*${params.searchValue}.*`, 'i')] };
  }

  return filter;
};

const courtQueries = {
  async courtDetail(root, { _id }) {
    return await Courts.findOne({ _id });
  },

  /** All courts */
  async allCourts(root, params) {
    const filter = await generateFilter(params);

    return Courts.find(filter);
  },

  /** Courts on web */
  async courts(root, params, req) {
    const { user } = req;

    if (!user) {
      return 'user not found';
    }

    if (user.role === 'admin') {
      return await Courts.find();
    } else {
      return await Courts.find({ ownderId: user._id });
    }

    /* {
      user.role === 'admin'
        ? await Courts.find()
        : await Courts.find({ ownerId: user._id });
    } */
  },
};
export default courtQueries;
