import { Router } from 'express'
import { deleteUser, getUserDetails, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.controller.js'
import verifyAuth from '../middlewares/verifyAuth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").get(verifyAuth, logoutUser)
router.route("/update-user").patch(verifyAuth, updateUser)
router.route("/delete-user").delete(verifyAuth, deleteUser)
router.route("/delete-user").delete(verifyAuth, getUserDetails)

// secured seller routes



export default router