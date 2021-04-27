import { Courts, Users } from '../../../db/models';

const courtMutations = {
  /**Court add */
  async courtsAdd(root, { ...doc }) {
    if (doc.ownerId) {
      await Users.updateOne({ _id: doc.ownerId }, { $set: { role: 'expert' } });
    }

    const court = await Courts.createCourt(doc);

    return court;
  },

  /** Edit court */
  async courtEdit(root, { _id, ...doc }) {
    if (doc.ownerId) {
      await Users.updateOne({ _id: doc.ownerId }, { $set: { role: 'expert' } });
    }

    const updated = await Courts.editCourt(_id, { ...doc });

    return updated;
  },

  /** Remove court */
  async removeCourt(root, { _id }) {
    return Courts.removeCourt(_id);
  },
};

export default courtMutations;
