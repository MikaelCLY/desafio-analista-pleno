import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useStatusFilter } from './useStatusFilter'

const BASE = [
  { numero_registro: 'REG-001', status: 'em_andamento' },
  { numero_registro: 'REG-002', status: 'concluido' },
  { numero_registro: 'REG-003', status: 'nao_iniciado' },
]

describe('useStatusFilter', () => {
  it('mostra todos os status iniciais por padrão', () => {
    const { result } = renderHook(() => useStatusFilter(BASE, false))

    expect(result.current.visiveis).toHaveLength(3)
    expect(result.current.usandoStatusInicial).toBe(true)
  })

  it('filtra pela seleção de status quando não está buscando', () => {
    const { result } = renderHook(() => useStatusFilter(BASE, false))

    act(() => result.current.setStatusFiltro(['concluido']))

    expect(result.current.visiveis.map((v) => v.numero_registro)).toEqual(['REG-002'])
    expect(result.current.usandoStatusInicial).toBe(false)
  })

  it('ignora o filtro de status quando está buscando', () => {
    const { result } = renderHook(() => useStatusFilter(BASE, true))

    act(() => result.current.setStatusFiltro(['concluido']))

    expect(result.current.visiveis).toHaveLength(3)
  })

  it('reset volta aos status iniciais', () => {
    const { result } = renderHook(() => useStatusFilter(BASE, false))

    act(() => result.current.setStatusFiltro(['concluido']))
    act(() => result.current.reset())

    expect(result.current.usandoStatusInicial).toBe(true)
    expect(result.current.visiveis).toHaveLength(3)
  })
})
