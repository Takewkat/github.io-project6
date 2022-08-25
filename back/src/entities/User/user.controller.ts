import { Request, Response, NextFunction } from 'express'
import * as userService from './user.service'

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const message = await userService.signup(email, password);
    return res.json(message);
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const userData = await userService.login(email, password);
    return res.json({ userId: userData.userId, token: userData.token });   
  } catch (e) {
    next(e);
  }
}