import ProductModel from "./sauce.model";
import ApiError from '../../exceptions/api.error';

export function likeValidation (likeNumber: number) {
  if (likeNumber >= -1 && likeNumber <= 1 && typeof likeNumber === 'number') {
    return true
  } else {
    throw ApiError.BadRequest('likeNumber must be -1, 0, or 1')
  }
}

export function alreadyUpdated (sauce: any, userId: string) {
  if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId)) {
    throw ApiError.BadRequest('You already liked or disliked this sauce')
  }
}

export function notUpdated (sauce: any, userId: string) {
  if (!sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)) {
    throw ApiError.BadRequest('You have not liked or disliked this sauce yet')
  }
}

export async function findOneSauce(sauceId: string) {
  const findedProduct = await ProductModel.findOne({ _id: sauceId })
  if (findedProduct) {
    return findedProduct
  } else {
    throw ApiError.NotFound("Product not found");
  }
}

export async function updateOneSauce(sauceId: string, newObj: object) {
  return await ProductModel.updateOne({ _id: sauceId }, { ...newObj, _id: sauceId })
}

export async function updateLikes(sauceId: string, newObj: object) {
  return await ProductModel.updateOne({ _id: sauceId }, newObj)
}
