import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import ApiResponse from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
import options from '../utils/options.js'
import { Product } from '../models/product.model.js'

const generateAccessRefreshToken = async function (id) {
  try {
    const user = await User.findById(id)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    if (!accessToken || !refreshToken) {
      throw new ApiError(500, `Couldn't generated accessToken ,${accessToken}`)
    }

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Couldn't generated access and refresh token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, password, isSeller } = req.body

  if ([userName, firstName, lastName, email, password].some((field) => {
    field.trim() == ""
  })) {
    throw new ApiError(400, "All fields are required!")
  }

  const existedUser = await User.findOne({ email })

  if (existedUser) {
    throw new ApiError(406, "User Already Exists")
  }

  const user = await User.create({
    userName,
    firstName,
    lastName,
    email,
    password,
    isSeller
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "User registration failed")
  }

  res.status(200).json(new ApiResponse(200, createdUser, "User created Successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    console.log(email, password)
    throw new ApiError(400, "All fields are required!")
  }

  const user = await User.findOne({ email })

  const isPassowrdCorrect = await user.isPasswordCorrect(password)

  if (!isPassowrdCorrect) {
    throw new ApiError(406, isPassowrdCorrect)
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  res.status(200).cookie("accesstoken", accessToken, options).cookie("refreshtoken", refreshToken, options).json(new ApiResponse(200, loggedInUser, "Logged in successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1
    }
  }, {
    new: true
  })

  res.status(200)
    .clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const addProduct = asyncHandler(async (req, res) => {
  // required to create product - title, description, stock, price, seller

  const seller = req.user
  const { title, description, stock, price } = req.body

  if (!title || !description || !stock || !price) {
    throw new ApiError(400, "All fields are required")
  }

  const imagePaths = req.files.map((file) => file.path)

  const product = await Product.create({
    title,
    description,
    seller: seller._id,
    images: imagePaths,
    stock,
    price
  })

  if (!product) {
    throw new ApiError(500, "Failed to create product")
  }

  const createdProduct = await Product.findById(product._id)

  res.status(200).json(new ApiResponse(200, createdProduct, "Product successfully added"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  addProduct
}