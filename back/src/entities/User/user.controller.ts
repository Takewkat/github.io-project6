const {validationResult} = require('express-validator');
const ApiError = require('../../exceptions/api-error');
import { Request, Response, NextFunction } from 'express'
const userService = require('./user.service');

class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const {email, password} = req.body;
      const message = await userService.signup(email, password);
      return res.json(message);
    } catch (e) {
      console.  log(e);
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      return res.json({ userId: userData.userId, token: userData.token });   
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

