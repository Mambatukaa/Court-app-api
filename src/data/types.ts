import * as express from 'express';
import { IUserDocument } from '../db/models/defintions/user';

export interface IContext {
  res: express.Response;
  requestInfo: any;
  user: IUserDocument;
}
