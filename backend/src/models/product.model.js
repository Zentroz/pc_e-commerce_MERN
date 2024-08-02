import mongoose, { Schema } from 'mongoose'
import ApiError from '../utils/apiError.js'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: []
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
},
  {
    timestamps: true
  })

productSchema.methods.findProductWithSellerName = async function (title, sellerName) {
  const product = await Product.aggregate([
    {
      $match: {
        title
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
            $match: {
              userName: sellerName
            }
          },
          {
            $project: {
              userName: 1
            }
          }
        ]
      }
    },
    {
      $addFields: {
        seller: {
          $first: "$seller"
        }
      }
    }
  ])

  return product
}

productSchema.methods.updateProductDetails = async function (title, description, price, stock) {
  if (this.title === title) {
    throw new ApiError(400, "Title should be different")
  }

  if (this.description === description) {
    throw new ApiError(400, "Description should be different")
  }

  if (this.price === price) {
    throw new ApiError(400, "Price should be different")
  }

  if (this.stock === stock) {
    throw new ApiError(400, "Title should be different")
  }

  if (title) {
    this.title = title
  }

  if (description) {
    this.description = description
  }

  if (price) {
    this.price = price
  }

  if (stock) {
    this.stock = stock
  }

  return await this.save()
}

export const Product = mongoose.model('Product', productSchema)