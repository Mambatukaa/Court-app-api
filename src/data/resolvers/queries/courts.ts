import { Courts } from '../../../db/models';

const courtQueries = {
  courtDetail(_root, { _id }: { _id: string }) {
    return Courts.getCourt(_id);
  },

  courtsMain(_root, { searchValue }: { searchValue: string }, _context) {
    const filter: any = {};

    if (searchValue) {
      filter.searchText = new RegExp(`${searchValue}`, 'i');
    }

    return Courts.find(filter).sort({ createdDate: 1 });
  }
};

export default courtQueries;
