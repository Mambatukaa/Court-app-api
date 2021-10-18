import { Courts } from '../../../db/models';

const courtQueries = {
  async courtDetail(_root, { _id }: { _id: string }) {
    return Courts.findOne({ _id });
  }
};

export default courtQueries;
