import { Router } from 'express'
import { addProduct, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import verifyAuth from '../middlewares/verifyAuth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import isSeller from '../middlewares/seller.middleware.js'

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").get(verifyAuth, logoutUser)

// secured seller routes
router.route("/add-product").post(verifyAuth, isSeller, upload.array("productImages", 8), addProduct)


export default router