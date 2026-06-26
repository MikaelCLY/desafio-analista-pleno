const db = require('./db')
const bannerService = require('./services/banner')
const { createApp } = require('./app')
const { createVeloriosRepository } = require('./repositories/veloriosRepository')
const { createVeloriosService } = require('./services/veloriosService')
const { createVeloriosController } = require('./controllers/veloriosController')

const veloriosRepository = createVeloriosRepository(db)
const veloriosService = createVeloriosService(veloriosRepository)
const veloriosController = createVeloriosController({
  veloriosService,
  bannerService,
})
const app = createApp({ veloriosController })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API on :${PORT}`))
