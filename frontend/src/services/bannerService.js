import { getBannerPdf } from '../api/velorios'

export async function buscarBannerPdf(velorioId) {
  return getBannerPdf(velorioId)
}
