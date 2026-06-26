import { useCallback, useMemo, useState } from 'react'
import {
  FILTROS_VAZIOS,
  STATUS_INICIAIS,
  aplicarFiltroStatus,
  contarFiltrosAtivos,
  contarPorStatus,
  criarOpcoesFiltro,
  filtrarVelorios,
  validarIntervalo,
} from '../utils/veloriosFilters'

export function useVeloriosDashboard(velorios) {
  const [termo, setTermo] = useState('')
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS)
  const [statusFiltro, setStatusFiltro] = useState(STATUS_INICIAIS)
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [searchKey, setSearchKey] = useState(0)

  const handleSearch = useCallback((val) => setTermo(val), [])
  const mudarFiltro = useCallback(
    (campo, valor) => setFiltros((filtrosAtuais) => ({ ...filtrosAtuais, [campo]: valor })),
    []
  )

  const opcoes = useMemo(() => criarOpcoesFiltro(velorios), [velorios])
  const rangeInvalido = useMemo(() => validarIntervalo(filtros), [filtros])
  const qtdFiltros = useMemo(() => contarFiltrosAtivos(filtros), [filtros])
  const buscando = !!termo.trim()

  const base = useMemo(
    () =>
      filtrarVelorios(velorios, {
        termo,
        filtros,
        ignorarIntervalo: rangeInvalido,
      }),
    [velorios, termo, filtros, rangeInvalido]
  )

  const counts = useMemo(() => contarPorStatus(base), [base])
  const visiveis = useMemo(
    () => (buscando ? base : aplicarFiltroStatus(base, statusFiltro)),
    [base, buscando, statusFiltro]
  )
  const usandoStatusInicial =
    Array.isArray(statusFiltro) &&
    statusFiltro.length === STATUS_INICIAIS.length &&
    STATUS_INICIAIS.every((status) => statusFiltro.includes(status))

  const limparTudo = useCallback(() => {
    setTermo('')
    setFiltros(FILTROS_VAZIOS)
    setStatusFiltro(STATUS_INICIAIS)
    setSearchKey((key) => key + 1)
  }, [])

  return {
    counts,
    filtros,
    filtrosAbertos,
    filtrando: buscando || qtdFiltros > 0 || !usandoStatusInicial,
    handleSearch,
    limparTudo,
    mudarFiltro,
    opcoes,
    qtdFiltros,
    rangeInvalido,
    searchKey,
    setFiltrosAbertos,
    setStatusFiltro,
    statusFiltro,
    visiveis,
  }
}
