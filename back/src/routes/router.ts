import { Router } from "express"
import * as userController from "../entities/User/user.controller"
import * as sauceController from "../entities/Product(sauce)/sauce.controller"
import imageService from "../services/image.service"
import auth from "../middleware/auth.middleware"
import { body } from "express-validator"

const router = Router()

router.post('/auth/signup', 
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.signup
)
router.post('/auth/login', userController.login)

router.get('/sauces', auth, sauceController.getAllSauces)
router.get('/sauces/:id', auth, sauceController.getSauceById)
router.post('/sauces', auth, imageService.upload, sauceController.createSauce)
router.put('/sauces/:id', auth, imageService.upload, sauceController.updateSauce, imageService.delete)
router.delete('/sauces/:id', auth, sauceController.deleteSauce, imageService.delete)

router.get('/images/:imageFileName', imageService.get)

export default router