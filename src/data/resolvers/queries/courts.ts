import { Courts } from '../../../db/models';

const courtQueries = {
  courtDetail(_root, { _id }: { _id: string }) {
    return Courts.getCourt(_id);
  },

  courtsMain(_root, _params, _context) {
    return Courts.find();
  }
};

export default courtQueries;
