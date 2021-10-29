import { Model, model } from 'mongoose';

import { courtSchema, ICourt, ICourtDocument } from './defintions/courts';

export interface ICourtModel extends Model<ICourtDocument> {
  getCourt(_id: string): Promise<ICourtDocument>;
  createCourt(docFields: ICourt, userId: string): Promise<ICourtDocument>;
}

export const loadClass = () => {
  class Court {
    public static async getCourt(_id: string) {
      const court = await Courts.findOne({ _id });

      if (!court) {
        throw new Error('court not found');
      }

      return court;
    }

    public static async createCourt(doc: ICourt, userId: string) {
      if (!userId) {
        throw new Error('userId must be supplied');
      }

      const court = await Courts.create({
        ...doc,
        createdBy: userId
      });

      return court;
    }
  }

  courtSchema.loadClass(Court);

  return courtSchema;
};

loadClass();

// tslint:disable-next-line
const Courts = model<ICourtDocument, ICourtModel>('courts', courtSchema);

export default Courts;
