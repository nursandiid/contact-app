import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'

const app = express()
dotenv.config()

app.use(cookieParser(process.env.SECRET))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 24 // 1 day
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
      ttl: 1000 * 60 * 24
    })
  })
)

app.use(flash())

export default app
