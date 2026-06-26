import { useCallback, useMemo, useState } from 'react'
import { STATUS_INICIAIS, aplicarFiltroStatus } from '../utils/veloriosFilters'

export function useStatusFilter(base, buscando) {
  const [statusFiltro, setStatusFiltro] = useState(STATUS_INICIAIS)

  const visiveis = useMemo(
    () => (buscando ? base : aplicarFiltroStatus(base, statusFiltro)),
    [base, buscando, statusFiltro]
  )

  const usandoStatusInicial =
    Array.isArray(statusFiltro) &&
    statusFiltro.length === STATUS_INICIAIS.length &&
    STATUS_INICIAIS.every((status) => statusFiltro.includes(status))

  const reset = useCallback(() => setStatusFiltro(STATUS_INICIAIS), [])

  return { statusFiltro, setStatusFiltro, visiveis, usandoStatusInicial, reset }
}
