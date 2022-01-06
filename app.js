import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import contactsRouter from './routes/api/contacts/index.js'

import { httpCode } from './lib/constants.js'
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = httpCode

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res
    .status(INTERNAL_SERVER_ERROR)
    .json({ status: 'fail', code: INTERNAL_SERVER_ERROR, message: err.message })
})

export default app
