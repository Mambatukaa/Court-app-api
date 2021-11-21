import { Model, model } from 'mongoose';
import { courtSchema, ICourt, ICourtDocument } from './defintions/courts';
import { validSearchText } from '../../data/utils';

export interface ICourtModel extends Model<ICourtDocument> {
  getCourt(_id: string): Promise<ICourtDocument>;
  createCourt(docFields: ICourt, userId: string): Promise<ICourtDocument>;
  updateCourt(
    _id: string,
    docFields: ICourt,
    userId?: string
  ): Promise<ICourtDocument>;
  removeCourt(_id: string): void;
  fillSearchText(docFields: ICourt): string;
}

export const loadClass = () => {
  class Court {
    public static fillSearchText(docFields: ICourt) {
      return validSearchText([docFields.name || '']);
    }

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
        createdBy: userId,
        searchText: Courts.fillSearchText(doc)
      });

      return court;
    }

    public static async updateCourt(
      _id: string,
      docFields: ICourt,
      userId?: string
    ) {
      if (!userId) {
        throw new Error('user must be supplied');
      }

      const court = await Courts.find({ _id });

      if (!court) {
        throw new Error('Court not found');
      }

      // get old court and assing new docFields
      const searchText = Courts.fillSearchText(
        Object.assign(await Courts.getCourt(_id), docFields) as ICourt
      );

      await Courts.updateOne(
        { _id },
        {
          $set: {
            ...docFields,
            modifiedBy: userId,
            modifiedDate: new Date(),
            searchText
          }
        }
      );

      return Courts.getCourt(_id);
    }

    public static async removeCourt(_id: string) {
      const court = await Courts.getCourt(_id);

      if (!court) {
        throw new Error('court not found');
      }

      return Courts.deleteOne({ _id });
    }
  }

  courtSchema.loadClass(Court);

  return courtSchema;
};

loadClass();

// tslint:disable-next-line
const Courts = model<ICourtDocument, ICourtModel>('courts', courtSchema);

export default Courts;
