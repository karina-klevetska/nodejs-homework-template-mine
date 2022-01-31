import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import contactsRouter from './routes/api/contacts/index.js'
import authRouter from './routes/api/auth/index.js'
import usersRouter from './routes/api/users/index.js'

import { httpCode } from './lib/constants.js'
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = httpCode

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.static(process.env.PUBLIC_DIR))

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const statusCode = err.status || INTERNAL_SERVER_ERROR
  const status = statusCode === INTERNAL_SERVER_ERROR ? 'fail' : 'error'
  res
    .status(statusCode)
    .json({ status, code: statusCode, message: err.message })
})

export default app
