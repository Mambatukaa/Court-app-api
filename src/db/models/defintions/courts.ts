import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface ICommonFields {
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
}
export interface ICourt {
  title: string;
}

export interface ICourtDocument extends ICourt, Document {
  _id: string;
}

// Mongoose schemas =======================

// common fields schema
export const commonFields = {
  createdDate: field({ type: Date, optional: true, label: 'Created Date' }),
  createdBy: field({ type: String, optional: true, label: 'Created by' }),
  modifiedDate: field({ type: String, optional: true, label: 'Modified Date' }),
  modifiedBy: field({ type: String, optional: true, label: 'Modified by' })
};

export const courtSchema = new Schema({
  _id: field({ pkey: true }),
  title: field({ type: String, label: 'Title' })
});
