import { Courts } from '../../../db/models';
import { ICourt } from '../../../db/models/defintions/courts';
import { IContext } from '../../types';

interface ICourtsEdit extends ICourt {
  _id: string;
}

const courtMutations = {
  async courtsAdd(_root, args: ICourt, { user }: IContext) {
    return Courts.createCourt(args, user._id);
  },

  async courtsEdit(_root, { _id, ...doc }: ICourtsEdit, { user }: IContext) {
    return Courts.updateCourt(_id, doc, user._id);
  },

  async courtsRemove(_root, { _id }: { _id: string }) {
    return Courts.removeCourt(_id);
  }
};

export default courtMutations;
