import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './db/db.js'

dotenv.config({
  path: './ env'
})

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR in app:", error)
      throw error
    })

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port: ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error)
  })