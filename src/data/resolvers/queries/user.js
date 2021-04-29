import { Users } from '../../../db/models';
import { paginate } from './utils';

const queryBuilder = async params => {
  let selector = {};

  if (params.searchValue) {
    const fields = [
      { 'details.fullname': new RegExp(`.*${params.searchValue}.*`, 'i') },
      { email: new RegExp(`.*${params.searchValue}.*`, 'i') },
      { username: new RegExp(`.*${params.searchValue}.*`, 'i') },
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
  async users(_root, doc) {
    const selector = await queryBuilder(doc);

    const users = paginate(Users.find(selector));

    return users.sort({ username: -1 });
  },

  async allUsers() {
    const users = await Users.find();

    return users;
  },

  userDetail(_root, { _id }) {
    return Users.findOne({ _id });
  },

  async expertUsers() {
    return await Users.find({ role: 'expert' });
  },

  async currentUser(_root, doc, { user }) {
    if (user) {
      return await Users.findOne({ _id: user._id });
    }

    return null;
  },

  async usersCount(_root, doc) {
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
  },
};

export default userQueries;
