import { useCallback, useState } from 'react'
import { buscarBannerPdf } from '../services/bannerService'
import { downloadBlob } from '../utils/fileDownload'

export function useBannerDownload() {
  const [erro, setErro] = useState(false)

  const exportarBanner = useCallback(async (velorio) => {
    try {
      const banner = await buscarBannerPdf(velorio.id)
      downloadBlob(banner, `banner-${velorio.numero_registro}.pdf`)
    } catch {
      setErro(true)
    }
  }, [])

  const limparErro = useCallback(() => setErro(false), [])

  return { erro, exportarBanner, limparErro }
}
