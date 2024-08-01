import { Router } from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import verifyAuth from '../middlewares/verifyAuth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import isSeller from '../middlewares/seller.middleware.js'

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").get(verifyAuth, logoutUser)

// secured seller routes



export default router