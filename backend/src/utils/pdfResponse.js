function sendPdf(res, doc, filename) {
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  doc.pipe(res)
  doc.end()
}

module.exports = { sendPdf }
