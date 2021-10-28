import { Users } from '../../../db/models';

const userQueries = {
  userDetail(_root, { _id }: { _id: string }) {
    return Users.getUser(_id);
  }
};

export default userQueries;
