import { Users } from '../../../db/models';

const userMutations = {
  /**
   * Login
   * @param {String} email - user email or username
   * @param {String} password - user password
   * @return {Promise} AuthPayload - token, refresh token
   */
  async login(_root, args, { res }) {
    const response = await Users.login(args);

    const { token } = response;

    const oneDay = 1 * 24 * 3600 * 1000; // 1 day

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      maxAge: oneDay,
    };

    const { NODE_ENV } = process.env;

    if (NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('auth-token', token, cookieOptions);

    return response;
  },

  userCreate(_root, doc) {
    return Users.createUser({ ...doc });
  },

  userUpdate(_root, { _id, ...doc }) {
    return Users.updateUser(_id, doc);
  },

  userRemove(_root, { _id }) {
    return Users.removeUser({ _id });
  },

  async profileEdit(
    _root,
    { username, email, password, avatar, firstName, lastName, phone, position },
    { user },
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
      position,
    });
  },

  forgotPassword(_root, { email }) {
    return Users.forgotPassword(email);
  },

  resetPassword(_root, { token, newPassword }) {
    return Users.resetPassword({ token, newPassword });
  },

  // front side/
  registerMember(_root, { email }) {
    return Users.register(email);
  },

  sendMessage(_root, { userId, message }) {
    return Users.sendMessage({ userId, message });
  },

  usersChangePassword(_root, doc, { user }) {
    return Users.changePassword({ _id: user._id, ...doc });
  },
};

export default userMutations;
