import jwt from 'jsonwebtoken'
import ApiError from '../utils/apiError.js'
import { User } from '../models/user.model.js'

const verifyAuth = async (req, res, next) => {
  const token = req.cookies?.accesstoken

  if (!token) {
    console.log(token)
    throw new ApiError(401, "Unauthorized User")
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken._id).select("-password -accessToken")

    if (!user) {
      throw new ApiError(500, "Couldn't find user from database")
    }

    req.user = user

    next()

  } catch (error) {
    throw new ApiError(400, "Invalid Token")
  }
}

export default verifyAuth