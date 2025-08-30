import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user: { id: string } };
      (req as any).user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token.' });
  }
};
