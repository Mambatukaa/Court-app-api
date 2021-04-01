import { Users } from '../../../db/models';

const userMutations = {
  /**
   * Login
   * @param {String} email - user email or username
   * @param {String} password - user password
   * @return {Promise} AuthPayload - token, refresh token
   */
  login(root, args) {
    return Users.login(args);
  },

  userCreate(root, doc) {
    return Users.createUser({ ...doc });
  },

  userUpdate(root, { _id, ...doc }) {
    return Users.updateUser(_id, doc);
  },

  userRemove(root, { _id }) {
    return Users.removeUser({ _id });
  },

  async profileEdit(
    root,
    { username, email, password, avatar, firstName, lastName, phone, position },
    { user }
  ) {
    const userDb = await Users.findOne({ _id: user._id });
    const valid = await Users.comparePassword(password, userDb.password);

    if (!password || !valid) {
      throw new Error('Invalid password');
    }

    return Users.editProfile(user._id, {
      username,
      email,
      avatar,
      firstName,
      lastName,
      phone,
      position
    });
  },

  forgotPassword(root, { email }) {
    return Users.forgotPassword(email);
  },

  resetPassword(root, { token, newPassword }) {
    return Users.resetPassword({ token, newPassword });
  },

  // front side/
  registerMember(root, { email }) {
    return Users.register(email);
  },

  sendMessage(root, { userId, message }) {
    return Users.sendMessage({ userId, message });
  },

  usersChangePassword(root, doc, { user }) {
    return Users.changePassword({ _id: user._id, ...doc });
  }
};

export default userMutations;
