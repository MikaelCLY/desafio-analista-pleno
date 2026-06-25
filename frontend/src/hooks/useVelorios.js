import { useState, useEffect } from 'react'
import { getVelorios } from '../api/velorios'

export function useVelorios(intervaloMs = 30000) {
  const [velorios, setVelorios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await getVelorios()
        if (!cancelled) {
          setVelorios(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err)
        // mantém últimos dados em falha (RF-4)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const id = setInterval(load, intervaloMs)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [intervaloMs])

  return { velorios, loading, error }
}
