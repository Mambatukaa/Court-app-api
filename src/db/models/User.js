import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import sha256 from 'sha256';
import bcrypt from 'bcrypt';
import { ROLES } from '../../data/constants';
import { sendEmail, sendEmailForgotPassword, sendEmailMessage } from '../../data/utils';
import { field } from './utils';

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: { type: String },
  role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.EXPERT, ROLES.USER],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  avatar: field({ type: String, optional: true }),
  firstName: String,
  lastName: String,
  phone: String,
  position: String, // hereggui
});

class User {
  static async checkDuplication(userFields, idsToExclude) {
    const query = {};
    let previousEntry = null;

    // Adding exclude operator to the query
    if (idsToExclude) {
      if (idsToExclude instanceof Array) {
        query._id = { $nin: idsToExclude };
      } else {
        query._id = { $ne: idsToExclude };
      }
    }

    // Checking if user has email
    if (userFields.email) {
      previousEntry = await this.find({ ...query, email: userFields.email });

      // Checking if duplicated
      if (previousEntry.length > 0) {
        throw new Error('Duplicated email');
      }
    }
  }

  static getSecret() {
    return 'qwe123';
  }

  /**
   * Generates new password
   */
  static async generatePassword(password) {
    const hashPassword = sha256(password);

    return bcrypt.hash(hashPassword, SALT_WORK_FACTOR);
  }

  /**
   * Compare password
   */
  static async comparePassword(password, userPassword) {
    const hashPassword = sha256(password);

    return bcrypt.compare(hashPassword, userPassword);
  }

  /*
   * Creates regular and refresh tokens using given user information
   * @param {Object} _user - User object
   * @param {String} secret - Token secret
   * @return [String] - list of tokens
   */
  static async createTokens(_user, secret) {
    const user = {
      _id: _user._id,
      email: _user.email,
      details: _user.details,
      role: _user.role,
    };

    const createToken = await jwt.sign({ user }, secret, { expiresIn: '3d' });

    const createRefreshToken = await jwt.sign({ user }, secret, {
      expiresIn: '7d',
    });

    return [createToken, createRefreshToken];
  }

  /*
   * Renews tokens
   * @param {String} refreshToken
   * @return {Object} renewed tokens with user
   */
  static async refreshTokens(refreshToken) {
    let _id = null;

    try {
      // validate refresh token
      const { user } = jwt.verify(refreshToken, this.getSecret());

      _id = user._id;

      // if refresh token is expired then force to login
    } catch (e) {
      return {};
    }

    const user = await Users.findOne({ _id });

    // recreate tokens
    const [newToken, newRefreshToken] = await this.createTokens(user, this.getSecret());

    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    };
  }

  /**
   * Create user
   * SuperAdmin, Admin can create user
   */
  static async createUser({
    username,
    email,
    password,
    role = 'user',
    avatar,
    firstName,
    lastName,
    phone,
  }) {
    if (password === '') {
      throw new Error('Password can not be empty');
    }

    await this.checkDuplication({ email });

    return this.create({
      username,
      email,
      password: await this.generatePassword(password),
      role,
      avatar,
      firstName,
      lastName,
      phone,
    });
  }

  /**
   * Update user
   * SuperAdmin, admin can update user
   */
  static async updateUser(
    _id,
    { username, email, password, role, avatar, firstName, lastName, phone },
  ) {
    const doc = {
      username,
      email,
      password,
      role,
      avatar,
      firstName,
      lastName,
      phone,
    };

    await Users.checkDuplication({ email }, _id);

    if (password) {
      doc.password = await this.generatePassword(password);
    } else {
      delete doc.password;
    }

    await Users.updateOne({ _id }, { $set: doc });

    return Users.findOne({ _id });
  }

  /**
   * Remove user
   */
  static async removeUser(_id) {
    return Users.remove({ _id });
  }

  static async editProfile(_id, { username, email, avatar, firstName, lastName, phone, position }) {
    await Users.checkDuplication({ email }, _id);

    await Users.updateOne(
      { _id },
      {
        $set: {
          username,
          email,
          avatar,
          firstName,
          lastName,
          phone,
          position,
        },
      },
    );

    return Users.findOne({ _id });
  }

  static async resetPassword({ token, newPassword }) {
    // find user by token
    const user = await this.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      throw new Error('Password reset token is invalid or has expired.');
    }

    if (!newPassword) {
      throw new Error('Password is required.');
    }

    // set new password
    await this.findByIdAndUpdate(
      { _id: user._id },
      {
        password: await this.generatePassword(newPassword),
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      },
    );

    return this.findOne({ _id: user._id });
  }

  /*
   * Change user password
   * @param {String} currentPassword - Current password
   * @param {String} newPassword - New password
   * @return {Promise} - Updated user information
   */
  static async changePassword({ _id, currentPassword, newPassword }) {
    // Password can not be empty string
    if (newPassword === '') {
      throw new Error('Password can not be empty');
    }

    const user = await Users.findOne({ _id });

    // check current password ============
    const valid = await this.comparePassword(currentPassword, user.password);

    if (!valid) {
      throw new Error('Incorrect current password');
    }

    // set new password
    await Users.findByIdAndUpdate(
      { _id: user._id },
      {
        password: await this.generatePassword(newPassword),
      },
    );

    return this.findOne({ _id: user._id });
  }

  /*
   * Sends reset password link to found user's email
   * @param {String} email - Registered user's email
   * @return {String} - Generated token
   */
  static async forgotPassword(email) {
    // find user
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Invalid email');
    }

    // create the random token
    const token = Math.random()
      .toString(36)
      .substring(2, 15);

    // save token & expiration date
    await this.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 86400000,
      },
    );

    const link = `${process.env.FRONT_DOMAIN}/reset-password?token=${token}`;

    await sendEmailForgotPassword(email, link);

    return 'Check your email';
  }

  static async sendMessage({ userId, message }) {
    const expert = await Users.findOne({ _id: userId });

    if (!expert) {
      throw new Error('Invalid user id');
    }

    await sendEmailMessage(expert.email, message);

    return 'Амжилттай!';
  }

  /**
   * Register user front
   */
  static async register(email) {
    await this.checkDuplication(email);

    return await this.create({
      email,
      password: await this.generetePasswordRegister(email),
      role: ROLES.MEMBER,
    });
  }

  static async sendApplyEmail(email, password) {
    return await sendEmail(email, password);
  }

  static async generetePasswordRegister(email) {
    let password = Math.floor(1000 + Math.random() * 9000);
    password = password.toString();

    await this.sendApplyEmail(email, password);

    const hashPassword = sha256(password);

    return bcrypt.hash(hashPassword, SALT_WORK_FACTOR);
  }

  static async login({ input, password }) {
    const user = await Users.findOne({
      $or: [
        { email: { $regex: new RegExp(input, 'i') } },
        { username: { $regex: new RegExp(input, 'i') } },
        { phone: { $regex: new RegExp(input, 'i') } },
      ],
    });

    if (!user) {
      throw new Error('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
    }

    const valid = await this.comparePassword(password, user.password);

    if (!valid) {
      // bad password
      throw new Error('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
    }

    // create tokens
    const [token, refreshToken] = await this.createTokens(user, this.getSecret());

    return {
      token,
      refreshToken,
    };
  }
}

userSchema.loadClass(User);

const Users = mongoose.model('users', userSchema);

export default Users;
