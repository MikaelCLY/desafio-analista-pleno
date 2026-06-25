const PDFDocument = require('pdfkit')

const fmt = (ts) =>
  new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts))

function gerarBanner(res, a) {
  const doc = new PDFDocument({ size: 'A4', margin: 60 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="banner-${a.numero_registro}.pdf"`
  )

  doc.pipe(res)

  doc
    .fontSize(28)
    .font('Helvetica-Bold')
    .text(a.nome_completo, { align: 'center' })

  doc.moveDown(2)

  doc.fontSize(14).font('Helvetica')

  doc.text(`Velório: ${fmt(a.inicio_velorio)}`)
  doc.moveDown(0.5)
  doc.text(`Sepultamento: ${fmt(a.inicio_sepultamento)}`)
  doc.moveDown(0.5)
  doc.text(`Local do sepultamento: ${a.local_sepultamento}`)
  doc.moveDown(0.5)
  doc.text(`Funerária: ${a.funeraria}`)

  doc.end()
}

module.exports = gerarBanner
