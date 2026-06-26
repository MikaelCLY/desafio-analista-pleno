const { sendPdf } = require('../utils/pdfResponse')

function createVeloriosController({ veloriosService, bannerService }) {
  return {
    async listarTodos(_req, res, next) {
      try {
        const velorios = await veloriosService.listarTodos()
        res.json(velorios)
      } catch (err) {
        next(err)
      }
    },

    async gerarBanner(req, res, next) {
      try {
        const velorio = await veloriosService.buscarParaBanner(req.params.id)
        const banner = bannerService.gerar(velorio)
        sendPdf(res, banner, `banner-${velorio.numero_registro}.pdf`)
      } catch (err) {
        next(err)
      }
    },
  }
}

module.exports = { createVeloriosController }
