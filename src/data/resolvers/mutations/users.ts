import { IUser } from '../../../db/models/defintions/user';
import { Users } from '../../../db/models';
import * as express from 'express';
import { IContext } from '../../types';
import { authCookieOptions } from '../../utils';

interface IUsersEdit extends IUser {
  _id: string;
}

interface ILogin {
  input: string;
  password?: string;
}

const login = async (args: ILogin, res: express.Response, secure: boolean) => {
  const response = await Users.login(args);

  const { token, refreshToken } = response;

  res.cookie('auth-token', token, authCookieOptions(secure));

  return {
    token,
    refreshToken
  };
};

const userMutations = {
  usersCreate(_root, args: IUser) {
    return Users.createUser(args);
  },

  usersEdit(_root, { _id, ...doc }: IUsersEdit) {
    return Users.updateUser(_id, doc);
  },

  usersRemove(_root, { _id }: { _id: string }) {
    return Users.removeUser(_id);
  },

  login(_root, args: ILogin, { res, requestInfo }: IContext) {
    return login(args, res, requestInfo.secure);
  },

  logout(_root, _args, { res }: IContext) {
    res.clearCookie('auth-token');

    return 'logged out';
  }
};

export default userMutations;
