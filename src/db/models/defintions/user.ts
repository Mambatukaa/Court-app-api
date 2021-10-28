import { Schema } from 'mongoose';
import { field } from './utils';

export interface IUser {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  createdAt?: Date;
  password: string;
}

export interface IUserDocument extends IUser {
  _id: string;
}

// mongoose user schema

export const userSchema = new Schema({
  _id: field({ pkey: true }),
  firstName: field({ type: String, optional: true, label: 'First Name' }),
  lastName: field({ type: String, optional: true, label: 'Last Name' }),
  phone: field({ type: Number, optional: true, label: 'Phone' }),
  email: field({ type: String, optional: true, label: 'Email' }),
  password: field({ type: String }),
  createdAt: field({ type: Date, label: 'Created At' })
});
