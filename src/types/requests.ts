import { Request } from 'express';

type User = {
  username: string;
  id: number;
};

export interface ExpressRequest extends Request {
  user?: User;
}
