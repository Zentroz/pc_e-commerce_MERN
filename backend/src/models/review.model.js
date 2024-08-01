import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    types: String,
    required: true
  },
  reviewedOn: {
    type: Schema.Types.ObjectId,
    ref: "Product"
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

export const Review = mongoose.model('Review', reviewSchema)