const BASE = import.meta.env.VITE_API_URL ?? '/api'

export async function getVelorios() {
  const res = await fetch(`${BASE}/velorios`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function bannerUrl(id) {
  return `${BASE}/velorios/${id}/banner`
}

export async function getBannerPdf(id) {
  const res = await fetch(bannerUrl(id))

  if (!res.ok) {
    const error = new Error('Erro ao gerar banner')
    error.statusCode = res.status
    throw error
  }

  return res.blob()
}
