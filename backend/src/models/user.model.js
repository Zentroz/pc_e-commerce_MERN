import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/apiError.js'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
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
  productsInCart: {
    type: [Schema.Types.ObjectId],
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

userSchema.methods.updateUserDetails = async function (userName, firstName, lastName, email, password, address) {
  if (this.userName == userName) {
    throw new ApiError(400, "Shouldn't be your current username")
  }

  if (this.firstName == firstName) {
    throw new ApiError(400, "Shouldn't be your current first name")
  }

  if (this.lastName == lastName) {
    throw new ApiError(400, "Shouldn't be your current last name")
  }

  if (this.email == email) {
    throw new ApiError(400, "Shouldn't be your current email")
  }

  const isPasswordSame = await bcrypt.compare(password, this.password)

  if (isPasswordSame) {
    throw new ApiError(400, "Shouldn't be your current password")
  }

  if (this.address) {
    if (this.address == address) {
      throw new ApiError(400, "Shouldn't be your current address")
    }
  }

  if (userName) {
    this.userName = userName
  }

  if (firstName) {
    this.firstName = firstName
  }

  if (lastName) {
    this.lastName = lastName
  }

  if (email) {
    this.email = email
  }

  if (password) {
    this.password = password
  }

  if (address) {
    this.address = address
  }

  return await this.save()
}


export const User = mongoose.model('User', userSchema)