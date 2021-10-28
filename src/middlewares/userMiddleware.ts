import * as jwt from 'jsonwebtoken';
import { Users } from '../db/models';

const userMiddleWare = (req, res, next) => {
  const token = req.cookies['auth-token'];

  if (token) {
    try {
      const { user } = jwt.verify(token, Users.getSecret());

      req.user = user;
    } catch (e: any) {
      console.log(e.message);
      console.log(res);
    }
  }

  next();
};

export default userMiddleWare;
