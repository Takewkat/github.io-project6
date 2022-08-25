import bcrypt from 'bcrypt'
import UserModel from './user.model'
import ApiError from '../../exceptions/api.error'
import * as tokenService from '../../services/token.service'

export async function signup(email: string, password: string) {
  const candidate = await UserModel.findOne({email})
  if (candidate) {
    throw ApiError.AlreadyExists(`User with ${email} already exists`)
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const user = await UserModel.create({email, password: hashPassword})

  const userId = user._id.toString()
  const token = tokenService.generateToken(userId, user.email)
  return {message : token };
}

export async function login(email: string, password: string) {
  const user = await UserModel.findOne({email})
  if (!user) {
    throw ApiError.NotFound('User not found')
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest('Wrong password');
  }

  const userId = user._id.toString()
  const token = tokenService.generateToken(userId, user.email)
  return { userId, token };
}