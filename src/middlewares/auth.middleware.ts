import { UsersService } from '../users/users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = verify(token, jwtSecret) as JwtPayload;
      const user = await this.userService.findById(decoded.id);

      req.user = user;
    } catch {
      req.user = null;
    }

    next();
  }
}
