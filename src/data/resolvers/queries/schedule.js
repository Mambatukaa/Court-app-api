import { Schedules } from '../../../db/models';

const generateFilter = async params => {
  const filter = {};

  if (params.ids) {
    filter._id = { $in: params.ids };
  }

  filter.startTime = { $gt: new Date().toISOString() };

  return filter;
};

const scheduleQueries = {
  async allSchedules(_root, params) {
    const filter = await generateFilter(params);

    return await Schedules.find(filter).sort({ startTime: 1 });
  },

  async scheduleDetail(_root, { _id }) {
    return await Schedules.findOne({ _id });
  },
};

export default scheduleQueries;
