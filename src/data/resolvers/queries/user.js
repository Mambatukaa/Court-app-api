import { Users } from '../../../db/models';
import { paginate } from './utils';

const queryBuilder = async params => {
  let selector = {};

  if (params.searchValue) {
    const fields = [
      { 'details.fullname': new RegExp(`.*${params.searchValue}.*`, 'i') },
      { email: new RegExp(`.*${params.searchValue}.*`, 'i') },
      { username: new RegExp(`.*${params.searchValue}.*`, 'i') }
    ];
    selector = { $or: fields };
  }

  if (params.username) {
    selector.username = new RegExp(`.*${params.username}.*`, 'i');
  }

  if (params.email) {
    selector.email = new RegExp(`.*${params.email}.*`, 'i');
  }

  if (params.phone) {
    selector.phone = new RegExp(`.*${params.phone}.*`, 'i');
  }

  selector.role = { $in: ['admin', 'expert'] };

  return selector;
};

const userQueries = {
  async users(root, doc) {
    const selector = await queryBuilder(doc);

    const users = paginate(Users.find(selector));

    return users.sort({ username: -1 });
  },

  userDetail(root, { _id }) {
    return Users.findOne({ _id });
  },

  async expertUsers() {
    return await Users.find({ role: 'expert' });
  },

  currentUser(root, doc, { user }) {
    if (user) {
      return Users.findOne({ _id: user._id, isActive: { $ne: false } });
    }

    return null;
  },

  async usersCount(root, doc) {
    let selector = {};

    if (doc.role) {
      selector.role = { $eq: doc.role };
    }

    if (doc.isBanned) {
      selector.isBanned = { $eq: doc.isBanned };
    } else if (doc.isBanned === false) {
      selector.isBanned = { $eq: false };
    }

    if (doc.isActive) {
      selector.isActive = { $eq: doc.isActive };
    } else if (doc.isActive === false) {
      selector.isActive = { $eq: false };
    }

    return Users.find(selector).countDocuments();
  }
};

export default userQueries;
