function createVeloriosController({ veloriosService, bannerService }) {
  const handleError = (res, err, fallbackMessage) => {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message })
    }

    console.error(fallbackMessage, err)
    return res.status(500).json({ error: fallbackMessage })
  }

  return {
    async listarTodos(_req, res) {
      try {
        const velorios = await veloriosService.listarTodos()
        res.json(velorios)
      } catch (err) {
        handleError(res, err, 'Erro ao consultar velórios')
      }
    },

    async gerarBanner(req, res) {
      try {
        const velorio = await veloriosService.buscarParaBanner(req.params.id)
        const banner = bannerService.gerar(velorio)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="banner-${velorio.numero_registro}.pdf"`
        )

        banner.pipe(res)
        banner.end()
      } catch (err) {
        handleError(res, err, 'Erro ao gerar banner')
      }
    },
  }
}

module.exports = { createVeloriosController }
