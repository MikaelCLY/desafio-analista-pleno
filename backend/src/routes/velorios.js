const { Router } = require('express')

function createVeloriosRouter(veloriosController) {
  const router = Router()

  router.get('/', veloriosController.listarTodos)
  router.get('/:id/banner', veloriosController.gerarBanner)

  return router
}

module.exports = { createVeloriosRouter }
