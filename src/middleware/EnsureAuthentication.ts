import { env } from 'env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenAuthorizationMissingError } from 'service/error/TokenAuthorizationMissingError';

interface JwtPayload {
  sub: string;
  isAdmin: boolean;
}

export class EnsureAuth {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new TokenAuthorizationMissingError();
      }

      const [, token] = authHeader.split(' ');

      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

      req.user = { id: decoded.sub };

      return next();
    } catch (err) {
      next(err);
    }
  }
}