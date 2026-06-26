import { useQuery } from '@tanstack/react-query'
import { listarVelorios } from '../services/veloriosService'

export function useVelorios(intervaloMs = 30000) {
  const { data = [], error, isLoading } = useQuery({
    queryKey: ['velorios'],
    queryFn: listarVelorios,
    refetchInterval: intervaloMs,
  })

  return { velorios: data, loading: isLoading, error }
}
