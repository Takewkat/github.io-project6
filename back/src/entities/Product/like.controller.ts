import { Request, Response, NextFunction } from 'express'
import * as LikeService from './like.service';

export default async function likeController (req: Request, res: Response, next: NextFunction) {
  try {
    const like: number = req.body.like
    const userId: string = req.body.userId
    const sauceId: string = req.params.id

    LikeService.likeValidation(like)
    const sauceToUpdate = await LikeService.findOneSauce(sauceId)

    switch (like) {
      case 0:
        LikeService.notUpdated(sauceToUpdate, userId)
        sauceToUpdate.usersLiked.includes(userId)
          ? await LikeService.updateLikes(sauceId, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
          : await LikeService.updateLikes(sauceId, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
        break
      case 1:
        LikeService.alreadyUpdated(sauceToUpdate, userId)
        await LikeService.updateOneSauce(sauceId, { $inc: { likes: +1 }, $push: { usersLiked: userId } })
        break
      case -1:
        LikeService.alreadyUpdated(sauceToUpdate, userId)
        await LikeService.updateLikes(sauceId, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } })
        break
    }
    res.status(201).json({ message: 'Like updated' })
  } catch (error) {
    next(error)
  }
}