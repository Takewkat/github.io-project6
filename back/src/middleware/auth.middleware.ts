const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token.service');
import { Response, NextFunction } from 'express'

module.exports = function (req: any, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateToken(token);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (e) {
      return next(ApiError.UnauthorizedError());
  }
};