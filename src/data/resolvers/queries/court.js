import { Courts, Schedules } from '../../../db/models';

const generateFilter = async params => {
  const filter = {};

  if (params.searchValue) {
    filter.searchText = { $in: [new RegExp(`.*${params.searchValue}.*`, 'i')] };
  }

  if (params.minPrice && params.maxPrice) {
    filter._id = await Schedules.find({
      price: { $gte: Number(params.minPrice), $lte: Number(params.maxPrice) },
    }).distinct('courtId');
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

    let courts;

    if (user.role === 'admin') {
      courts = await Courts.find();
    } else {
      courts = await Courts.find({ ownerId: user._id });
    }

    return courts;
  },
};
export default courtQueries;
