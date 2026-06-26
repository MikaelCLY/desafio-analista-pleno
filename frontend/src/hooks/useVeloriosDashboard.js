import { useCallback, useMemo, useState } from 'react'
import { contarPorStatus } from '../utils/veloriosFilters'
import { useVeloriosFilters } from './useVeloriosFilters'
import { useStatusFilter } from './useStatusFilter'

export function useVeloriosDashboard(velorios) {
  const filtros = useVeloriosFilters(velorios)
  const status = useStatusFilter(filtros.base, filtros.buscando)
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)

  const counts = useMemo(() => contarPorStatus(filtros.base), [filtros.base])

  const limparTudo = useCallback(() => {
    filtros.reset()
    status.reset()
  }, [filtros, status])

  return {
    counts,
    filtros: filtros.filtros,
    filtrosAbertos,
    filtrando: filtros.buscando || filtros.qtdFiltros > 0 || !status.usandoStatusInicial,
    handleSearch: filtros.handleSearch,
    limparTudo,
    mudarFiltro: filtros.mudarFiltro,
    opcoes: filtros.opcoes,
    qtdFiltros: filtros.qtdFiltros,
    rangeInvalido: filtros.rangeInvalido,
    searchKey: filtros.searchKey,
    setFiltrosAbertos,
    setStatusFiltro: status.setStatusFiltro,
    statusFiltro: status.statusFiltro,
    visiveis: status.visiveis,
  }
}
