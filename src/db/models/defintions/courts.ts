import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface ICourt {
  title: string;
}

export interface ICourtDocument extends ICourt, Document {
  _id: string;
  createdDate: Date;
}

// Mongoose schemas =======================
export const courtSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, label: 'Title' }),
  createdDate: field({ type: Date, label: 'Created at' })
});
