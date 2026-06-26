const { createPool, createDb } = require('./db')
const { createApp } = require('./app')
const { createVeloriosRepository } = require('./repositories/veloriosRepository')
const { createVeloriosService } = require('./services/veloriosService')
const { createVeloriosController } = require('./controllers/veloriosController')
const { createBannerService } = require('./services/banner')

const pool = createPool()
const db = createDb(pool)

const veloriosRepository = createVeloriosRepository(db)
const veloriosService = createVeloriosService(veloriosRepository)
const bannerService = createBannerService()
const veloriosController = createVeloriosController({
  veloriosService,
  bannerService,
})
const app = createApp({ veloriosController })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API on :${PORT}`))
