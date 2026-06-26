import { useCallback, useMemo, useState } from 'react'
import {
  FILTROS_VAZIOS,
  contarFiltrosAtivos,
  criarOpcoesFiltro,
  filtrarVelorios,
  validarIntervalo,
} from '../utils/veloriosFilters'

export function useVeloriosFilters(velorios) {
  const [termo, setTermo] = useState('')
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS)
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

  const reset = useCallback(() => {
    setTermo('')
    setFiltros(FILTROS_VAZIOS)
    setSearchKey((key) => key + 1)
  }, [])

  return {
    termo,
    filtros,
    searchKey,
    handleSearch,
    mudarFiltro,
    opcoes,
    rangeInvalido,
    qtdFiltros,
    buscando,
    base,
    reset,
  }
}
