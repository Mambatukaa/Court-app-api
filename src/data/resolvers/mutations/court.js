import Courts from '../../../db/models/Court';

const courtMutations = {
  /**Court add */
  async courtsAdd(root, { ...doc }) {
    const court = await Courts.createCourt(doc);

    return court;
  },

  /** Edit court */
  async courtEdit(root, { _id, ...doc }) {
    const updated = await Courts.editCourt(_id, { ...doc });

    return updated;
  },

  /** Remove court */
  async removeCourt(root, { _id }) {
    return Courts.removeCourt(_id);
  },
};

export default courtMutations;
