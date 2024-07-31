import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

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
    timestamps: {
      createdAt,
      updatedAt
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

export const User = mongoose.model('User', userSchema)