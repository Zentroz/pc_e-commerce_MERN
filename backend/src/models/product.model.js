import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: []
  },
  stock: {
    type: String,
    required: true
  },
  price: {
    type: String,
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
    timestamps: {
      createdAt,
      updatedAt
    }
  })

export const Product = mongoose.model('Product', productSchema)