const Router = require('express')
import userController from "../entities/User/user.controller"

const router = new Router()

router.post('/auth/signup', userController.signup)
router.post('/auth/login', userController.login)

export default router