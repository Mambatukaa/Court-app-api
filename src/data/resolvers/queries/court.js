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
};

export default courtQueries;
