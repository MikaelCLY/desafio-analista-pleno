function errorHandler(err, _req, res, _next) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  console.error(err)
  return res.status(500).json({ error: 'Erro interno' })
}

module.exports = { errorHandler }
