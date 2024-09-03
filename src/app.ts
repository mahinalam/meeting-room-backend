import { Application } from 'express'
import express from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFoundRoute'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
const app: Application = express()
//parsers
app.use(express.json())
app.use(
  cors({ origin: 'https://meeting-room-mu.vercel.app', credentials: true }),
)
app.use('/api', router)
app.use(notFound)
app.use(globalErrorHandler)

export default app
