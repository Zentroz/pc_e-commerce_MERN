import mongoose from "mongoose"
import { Product } from "../models/product.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"

const addProduct = asyncHandler(async (req, res) => {
  // required to create product - title, description, stock, price, seller

  const seller = req.user
  const { title, description, stock, price } = req.body

  if (!title || !description || !stock || !price) {
    throw new ApiError(400, "All fields are required")
  }

  const imagePaths = req.files.map((file) => file.path)

  // const product = await Product.create({
  //   title,
  //   description,
  //   seller: seller._id,
  //   images: imagePaths,
  //   stock,
  //   price
  // })

  // if (!product) {
  //   throw new ApiError(500, "Failed to create product")
  // }

  // const createdProduct = await Product.findById(product._id)

  const createdProduct = await Product.aggregate([
    {
      $match: {
        "_id": new mongoose.Types.ObjectId("66aba00d4f3263aace4b84ea")
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "_id",
        as: "seller",
        pipeline: [
          {
            $project: {
              _id: 0,
              userName: 1
            }
          },
        ]
      },
    },
    {
      $addFields: {
        seller: {
          $first: "$seller"
        }
      }
    }
  ])

  res.status(200).json(new ApiResponse(200, createdProduct, "Product successfully added"))
})

export {
  addProduct,
}