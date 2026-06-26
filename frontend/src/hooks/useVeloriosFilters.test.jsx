import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useVeloriosFilters } from './useVeloriosFilters'

const VELORIOS = [
  { numero_registro: 'REG-001', nome_completo: 'Maria Silva', funeraria: 'Luz', sala_velorio: 'A', local_sepultamento: 'Central', inicio_velorio: '2026-06-10T10:00:00Z', status: 'em_andamento' },
  { numero_registro: 'REG-002', nome_completo: 'João Souza', funeraria: 'Paz', sala_velorio: 'B', local_sepultamento: 'Jardim', inicio_velorio: '2026-06-20T10:00:00Z', status: 'concluido' },
]

describe('useVeloriosFilters', () => {
  it('filtra a base ao buscar por termo', () => {
    const { result } = renderHook(() => useVeloriosFilters(VELORIOS))

    expect(result.current.base).toHaveLength(2)

    act(() => result.current.handleSearch('joão'))

    expect(result.current.buscando).toBe(true)
    expect(result.current.base.map((v) => v.numero_registro)).toEqual(['REG-002'])
  })

  it('conta filtros ativos e filtra pela base', () => {
    const { result } = renderHook(() => useVeloriosFilters(VELORIOS))

    act(() => result.current.mudarFiltro('funeraria', 'Luz'))

    expect(result.current.qtdFiltros).toBe(1)
    expect(result.current.base.map((v) => v.numero_registro)).toEqual(['REG-001'])
  })

  it('reset volta ao estado inicial', () => {
    const { result } = renderHook(() => useVeloriosFilters(VELORIOS))

    act(() => {
      result.current.handleSearch('maria')
      result.current.mudarFiltro('funeraria', 'Luz')
    })
    act(() => result.current.reset())

    expect(result.current.termo).toBe('')
    expect(result.current.qtdFiltros).toBe(0)
    expect(result.current.base).toHaveLength(2)
  })
})
