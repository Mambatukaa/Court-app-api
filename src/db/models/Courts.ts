import { Model, model } from 'mongoose';

import { courtSchema, ICourt, ICourtDocument } from './defintions/courts';

export interface ICourtModel extends Model<ICourtDocument> {
  getCourt(_id: string): Promise<ICourtDocument>;
  createCourt(docFields: ICourt): Promise<ICourtDocument>;
}

export const loadClass = () => {
  class Court {
    public static async getCourt(_id: string) {
      const checklist = await Courts.findOne({ _id });

      if (!checklist) {
        throw new Error('Checklist not found');
      }

      return checklist;
    }

    public static async createCourt(doc: ICourt) {
      const court = await Courts.create({
        ...doc
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
