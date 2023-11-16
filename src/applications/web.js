import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'
import notFoundMiddleware from '../middleware/not-found.middleware.js'
import globalVariablesMiddleware from '../middleware/global-variables.middleware.js'
import isGuest from '../middleware/is-guest.js'
import expressLayouts from 'express-ejs-layouts'
import session from '../applications/session.js'
import methodOverride from 'method-override'
import authRouter from '../routes/auth.js'
import dashboardRouter from '../routes/dashboard.js'
import contactRouter from '../routes/contact.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static('public'))
app.use(session)

// set template engine
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(expressLayouts)

// override method
app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method
      delete req.body._method

      return method
    }
  })
)

// global variabels
app.use(globalVariablesMiddleware)

dotenv.config()

app.get('/', isGuest, (req, res) => {
  res.send(`Hi, it's working`)
})
app.use(authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/contacts', contactRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

export default app
