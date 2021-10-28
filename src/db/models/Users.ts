import { Model, model } from 'mongoose';
import { IUser, IUserDocument, userSchema } from './defintions/user';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const SALT_WORK_FACTOR = 10;

interface ILoginParams {
  email?: string;
  password?: string;
}

export interface IUserModel extends Model<IUserDocument> {
  generatePassword(password: string): Promise<string>;
  getUser(_id: string): Promise<IUserDocument>;
  createUser(docFields: IUser): Promise<IUserDocument>;
  updateUser(_id: string, docFields: IUser): Promise<IUserDocument>;
  removeUser(_id: string): Promise<any>;
  getTokenFields(user: IUserDocument);
  createTokens(_user: IUserDocument, secret: string): string[];
  getSecret(): string;
  comparePassword(password: string, userPassword: string): boolean;

  login: (params: ILoginParams) => Promise<any>;
}

const loadClass = () => {
  class User {
    public static async generatePassword(password: string) {
      return bcrypt.hash(password, SALT_WORK_FACTOR);
    }

    public static async comparePassword(
      password: string,
      userPassword: string
    ) {
      return bcrypt.compare(password, userPassword);
    }

    public static getTokenFields(user: IUserDocument) {
      return {
        _id: user._id,
        email: user.email
      };
    }

    public static getSecret() {
      return process.env.JWT_TOKEN_SECRET || '';
    }

    /*
     * Creates regular and refresh tokens using given user information
     */
    public static async createTokens(_user: IUserDocument, secret: string) {
      const user = this.getTokenFields(_user);

      const createToken = await jwt.sign({ user }, secret, { expiresIn: '1d' });

      const createRefreshToken = await jwt.sign({ user }, secret, {
        expiresIn: '7d'
      });

      return [createToken, createRefreshToken];
    }

    public static async getUser(_id: string) {
      const user = Users.findOne({ _id });

      if (!user) {
        throw new Error('user not found');
      }

      return user;
    }

    public static async createUser(docFields: IUser) {
      const user = await Users.create({
        ...docFields,
        password: await this.generatePassword(docFields.password),
        createdAt: new Date()
      });

      return user;
    }

    public static async updateUser(_id: string, docFields: IUser) {
      await Users.updateOne({ _id }, { $set: docFields });

      return User.getUser(_id);
    }

    public static async removeUser(_id: string) {
      const user = await Users.findOne({ _id });

      if (!user) {
        throw new Error('User not found');
      }

      return Users.deleteOne({ _id });
    }

    public static async login({
      email,
      password
    }: {
      email: string;
      password: string;
    }) {
      email = (email || '').toLowerCase().trim();
      password = (password || '').trim();

      const user = await Users.findOne({
        email
      });

      if (!user || !user.password) {
        throw new Error('Invalid login');
      }

      const valid = await this.comparePassword(password, user.password);

      if (!valid) {
        throw new Error('Invalid login');
      }

      const [token, refreshToken] = await this.createTokens(
        user,
        this.getSecret()
      );

      return { token, refreshToken };
    }
  }

  userSchema.loadClass(User);

  return userSchema;
};

loadClass();

const Users = model<IUserDocument, IUserModel>('users', userSchema);

export default Users;
