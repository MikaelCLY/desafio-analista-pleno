const express = require('express')
const cors = require('cors')
const veloriosRouter = require('./routes/velorios')

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())

app.use('/api/velorios', veloriosRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API on :${PORT}`))
