import bcrypt from 'bcrypt'
import UserModel from './user.model';
const ApiError = require('../../exceptions/api-error');
import { generateToken } from '../../services/token.service'

class UserService {
  async signup(email: string, password: string) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} email already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({email, password: hashPassword})

    const userId = user._id.toString()
    const token = generateToken(userId, user.email)
    return {message : token };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('User not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password');
    }

    const userId = user._id.toString()
    const token = generateToken(userId, user.email)
    return { userId, token };
  }
}

module.exports = new UserService();