import ApiError from "../utils/apiError.js"

const isSeller = async (req, res, next) => {
  const isSeller = req.user.isSeller

  if (!isSeller) {
    throw new ApiError(400, "Not authorized")
  }

  next()
}

export default isSeller