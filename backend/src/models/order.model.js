import mongoose, { Schema } from 'mongoose'

const orderSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  transaction_id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
  }
})

export const Order = mongoose.model('Order', orderSchema)