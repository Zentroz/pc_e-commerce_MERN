import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}`)
    console.log("MongoDB Connect,", "DB_HOST:", connectionInstance.connection.host)
  } catch (error) {
    console.log("DB_ERROR:", error)
    process.exit(1)
  }
}

export default connectDB