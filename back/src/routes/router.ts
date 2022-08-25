import { Router } from "express"
import * as userController from "../entities/User/user.controller"
import * as sauceController from "../entities/Product/sauce.controller"
import likeController from "../entities/Product/like.controller"
import imageService from "../services/image.service"
import auth from "../middleware/auth.middleware"

const router = Router()

router.post('/auth/signup', userController.signup)
router.post('/auth/login', userController.login)

router.get('/sauces', auth, sauceController.getAllSauces)
router.get('/sauces/:id', auth, sauceController.getSauceById)
router.post('/sauces', auth, imageService.upload, sauceController.createSauce)
router.put('/sauces/:id', auth, imageService.upload, sauceController.updateSauce, imageService.delete)
router.delete('/sauces/:id', auth, sauceController.deleteSauce, imageService.delete)
router.post('/sauces/:id/like', auth, likeController)

router.get('/images/:imageFileName', imageService.get)

export default router