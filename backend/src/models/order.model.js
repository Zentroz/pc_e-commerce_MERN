import mongoose, { Schema } from 'mongoose'

const orderSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  buyer: {
    type: String,
    required: true
  },
  discount: {
    type: String
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

export const Order = mongoose.model('Order', orderSchema)