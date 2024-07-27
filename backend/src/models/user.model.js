import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  isSeller: {
    type: Boolean,
    required: true
  },
  purchased_items: {
    type: []
  },
  listed_items: {
    type: []
  }
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
})

userSchema.method.isPassowrdCorrect = async function (password) {
  return await bcrypt.compare(passowrd, this.passowrd)
}

export const User = mongoose.model('User', orderSchema)