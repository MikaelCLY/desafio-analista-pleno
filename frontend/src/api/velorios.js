const BASE = import.meta.env.VITE_API_URL ?? '/api'

export async function getVelorios() {
  const res = await fetch(`${BASE}/velorios`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function bannerUrl(id) {
  return `${BASE}/velorios/${id}/banner`
}
