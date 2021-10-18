import { Courts } from '../../../db/models';

const courtMutations = {
  async addCourt(_root, { title }: { title: string }) {
    const court = await Courts.createCourt({
      title
    });

    return court;
  }
};

export default courtMutations;
