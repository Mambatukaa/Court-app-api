import { Users } from '../../db/models';

export default {
  async firstName(eva) {
    const user = await Users.findOne({ _id: eva.userId });
    if (user) {
      return user.firstName || '';
    }
    return '';
  },

  async lastName(eva) {
    const user = await Users.findOne({ _id: eva.userId });
    if (user) {
      return user.firstName || '';
    }
    return '';
  }
};
