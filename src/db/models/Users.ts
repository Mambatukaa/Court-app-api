import { Model, model } from 'mongoose';
import { IUser, IUserDocument, userSchema } from './defintions/user';

export interface IUserModel extends Model<IUserDocument> {
  getUser(_id: string): Promise<IUserDocument>;
  createUser(docFields: IUser): Promise<IUserDocument>;
  updateUser(_id: string, docFields: IUser): Promise<IUserDocument>;
  removeUser(_id: string): Promise<any>;
}

const loadClass = () => {
  class User {
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
  }

  userSchema.loadClass(User);

  return userSchema;
};

loadClass();

const Users = model<IUserDocument, IUserModel>('users', userSchema);

export default Users;
