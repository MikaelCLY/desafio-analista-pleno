const PDFDocument = require('pdfkit')
const { createAssetResolver } = require('../utils/assetResolver')
const { formatDateTime, formatGeneratedAt } = require('../utils/dateFormatter')
const { AppError } = require('../errors/AppError')
const layout = require('./banner/bannerLayout')

const CAMPOS_OBRIGATORIOS = [
  'nome_completo',
  'inicio_velorio',
  'inicio_sepultamento',
  'local_sepultamento',
  'funeraria',
  'numero_registro',
]

function createBannerService({
  assetResolver = createAssetResolver(),
  createDocument = () => new PDFDocument({ size: 'A4', margin: 0 }),
  dateFormatter = formatDateTime,
  generatedAtFormatter = formatGeneratedAt,
} = {}) {
  return {
    gerar(velorio) {
      const faltando = CAMPOS_OBRIGATORIOS.filter((campo) => !velorio?.[campo])
      if (faltando.length) {
        throw new AppError('Dados do velório incompletos para o banner', 422)
      }

      const doc = createDocument()

      layout.drawHeader(doc, assetResolver)
      layout.drawBody(doc, velorio, dateFormatter)
      layout.drawFooter(doc, generatedAtFormatter())

      return doc
    },
  }
}

module.exports = { createBannerService }
