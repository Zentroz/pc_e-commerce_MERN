import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  purchases: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  productsListed: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  productsInCart: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  refreshToken: {
    type: String
  }
},
  {
    timestamps: true
  })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, userName: this.userName }, process.env.JWT_SECRET, {
    expiresIn: "5d"
  })
}

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ _id: this._id, userName: this.userName }, process.env.JWT_SECRET, {
    expiresIn: "5d"
  }
  )
}


export const User = mongoose.model('User', userSchema)