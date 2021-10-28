import { IUser } from '../../../db/models/defintions/user';
import Users from '../../../db/models/Users';

interface IUsersEdit extends IUser {
  _id: string;
}

const userMutations = {
  usersAdd(_root, args: IUser) {
    return Users.createUser(args);
  },

  usersEdit(_root, { _id, ...doc }: IUsersEdit) {
    return Users.updateUser(_id, doc);
  },

  usersRemove(_root, { _id }: { _id: string }) {
    return Users.removeUser(_id);
  }
};

export default userMutations;
