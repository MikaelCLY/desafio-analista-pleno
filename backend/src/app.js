const express = require('express')
const cors = require('cors')
const { createVeloriosRouter } = require('./routes/velorios')
const { errorHandler } = require('./middlewares/errorHandler')

function createApp({ veloriosController }) {
  const app = express()

  app.use(cors({ origin: process.env.CORS_ORIGIN }))
  app.use(express.json())

  app.use('/api/velorios', createVeloriosRouter(veloriosController))

  app.use(errorHandler)

  return app
}

module.exports = { createApp }
