import { Request, Response } from 'express';
import * as AuthService from './auth.service';
import { signToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const user = await AuthService.signup(name, email, password);
  const token = signToken({ userId: user.id });

  res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const user = await AuthService.login(email, password);
  const token = signToken({ userId: user.id });

  res.json({ user, token });
};
