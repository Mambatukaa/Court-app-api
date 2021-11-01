import { Users } from '../../../db/models';
import { IContext } from '../../types';

const userQueries = {
  userDetail(_root, { _id }: { _id: string }) {
    return Users.getUser(_id);
  },

  currentUser(_root, _params, { user }: IContext) {
    return Users.findOne({ _id: user._id });
  }
};

export default userQueries;
