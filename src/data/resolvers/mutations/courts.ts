import { Courts } from '../../../db/models';
import { ICourt } from '../../../db/models/defintions/courts';
import { IContext } from '../../types';

const courtMutations = {
  async courtsAdd(_root, args: ICourt, { user }: IContext) {
    return Courts.createCourt(args, user._id);
  }
};

export default courtMutations;
