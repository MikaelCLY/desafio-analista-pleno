const path = require('path')
const { BRAND } = require('../../config/brand')

const LOGO_PATH = path.resolve(__dirname, '../../assets/luto-mark.png')

function drawHeader(doc, assetResolver) {
  const { width } = doc.page
  const headerHeight = 96

  doc.save()
  doc.rect(0, 0, width, headerHeight).fill(BRAND.paper)
  doc.rect(0, headerHeight - 2, width, 2).fill(BRAND.divider)
  doc.rect(0, 0, 12, headerHeight).fill(BRAND.primaryLight)

  if (assetResolver.exists(LOGO_PATH)) {
    doc.image(LOGO_PATH, 58, 26, { fit: [42, 42] })
  }

  doc
    .fillColor(BRAND.primaryLight)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(BRAND.eyebrow.toUpperCase(), 118, 27, { characterSpacing: 1.6 })

  doc
    .fillColor(BRAND.text)
    .font('Helvetica-Bold')
    .fontSize(22)
    .text(BRAND.name, 118, 41)

  doc
    .fillColor(BRAND.textSecondary)
    .font('Helvetica')
    .fontSize(9)

  doc.restore()
}

function drawFooter(doc, generatedAt) {
  const { width, height } = doc.page
  const footerY = height - 62

  doc.save()
  doc.rect(0, footerY - 10, width, 1).fill(BRAND.divider)
  doc
    .fillColor(BRAND.textSecondary)
    .font('Helvetica')
    .fontSize(9)
    .text(`Gerado em ${generatedAt}`, 60, footerY, {
      width: width - 120,
      align: 'center',
    })

  doc
    .fillColor(BRAND.primaryDark)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(BRAND.name, 60, footerY + 16, {
      width: width - 120,
      align: 'center',
    })
  doc.restore()
}

function drawInfoRow(doc, label, value, y) {
  doc
    .fillColor(BRAND.textSecondary)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text(label.toUpperCase(), 88, y, { characterSpacing: 0.4 })

  doc
    .fillColor(BRAND.text)
    .font('Helvetica')
    .fontSize(15)
    .text(value, 88, y + 17, { width: 420 })
}

function drawBody(doc, velorio, dateFormatter) {
  doc.rect(0, 96, doc.page.width, doc.page.height - 158).fill(BRAND.background)

  doc.save()
  doc
    .roundedRect(60, 134, doc.page.width - 120, 500, 8)
    .lineWidth(1)
    .fillAndStroke(BRAND.paper, BRAND.divider)
  doc.restore()

  doc
    .fillColor(BRAND.primaryDark)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text('Falecido(a)', 88, 166, { characterSpacing: 0.5 })

  doc
    .fillColor(BRAND.text)
    .fontSize(28)
    .text(velorio.nome_completo, 88, 188, {
      width: 420,
      align: 'left',
    })

  doc
    .moveTo(88, 258)
    .lineTo(doc.page.width - 88, 258)
    .strokeColor(BRAND.divider)
    .lineWidth(1)
    .stroke()

  drawInfoRow(doc, 'Início do velório', dateFormatter(velorio.inicio_velorio), 290)
  drawInfoRow(doc, 'Início do sepultamento', dateFormatter(velorio.inicio_sepultamento), 356)
  drawInfoRow(doc, 'Local do sepultamento', velorio.local_sepultamento, 422)
  drawInfoRow(doc, 'Funerária responsável', velorio.funeraria, 488)
}

module.exports = { drawHeader, drawBody, drawFooter, drawInfoRow }
