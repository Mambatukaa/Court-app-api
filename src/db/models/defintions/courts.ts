import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface ICommonFields {
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
export interface ICourt {
  name: string;
  description: string;

  parking: string;
  ownerId: string;
  warning: string;
  location: ILocation;
  featuredImage: string;
  secondaryImages: string[];
  searchText: string;
  surface?: string;
  format?: string;
}

export interface ICourtDocument extends ICourt, ICommonFields, Document {
  _id: string;
}

export const locationSchema = new Schema(
  {
    latitude: field({ type: String, label: 'Latitude' }),
    longitude: field({ type: String, label: 'longitude' })
  },
  { _id: false }
);

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
  name: field({ type: String, label: 'Title' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  parking: field({ type: String, label: 'Parking' }),
  ownerId: field({ type: String, label: 'Owner' }),
  warning: field({ type: String, label: 'Warning' }),
  featuredImage: field({ type: String, label: 'Featured image' }),
  secondaryImages: field({ type: String, label: 'Secondary images' }),

  searchText: field({ type: String, label: 'Search text' }),
  surface: field({ type: String, label: 'Surface' }),
  format: field({ type: String, optional: true, label: 'Surface' }),
  location: field({
    type: locationSchema
  }),

  ...commonFields
});
