import mongoose, { mongo, Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

export const Category = mongoose.model("category", categorySchema)