import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(cookieParser())
app.use(cors({ credentials: true }))
app.use(express.static("public"))

//Routes
import userRouter from './routers/user.routes.js'
import productRouter from './routers/product.routes.js'

app.use("/user", userRouter)
app.use("/product", productRouter)

export { app }