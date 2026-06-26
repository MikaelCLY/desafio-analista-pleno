import { describe, expect, it } from 'vitest'
import {
  FILTROS_VAZIOS,
  aplicarFiltroStatus,
  contarFiltrosAtivos,
  contarPorStatus,
  criarOpcoesFiltro,
  filtrarVelorios,
  validarIntervalo,
} from './veloriosFilters'

const VELORIOS = [
  {
    numero_registro: 'REG-001',
    nome_completo: 'Maria Silva',
    funeraria: 'Luz',
    sala_velorio: 'Sala A',
    local_sepultamento: 'Central',
    inicio_velorio: '2026-06-10T10:00:00Z',
    status: 'em_andamento',
  },
  {
    numero_registro: 'REG-002',
    nome_completo: 'João Souza',
    funeraria: 'Paz',
    sala_velorio: 'Sala B',
    local_sepultamento: 'Jardim',
    inicio_velorio: '2026-06-20T10:00:00Z',
    status: 'concluido',
  },
  {
    numero_registro: 'REG-003',
    nome_completo: 'Ana Lima',
    funeraria: 'Luz',
    sala_velorio: 'Sala A',
    local_sepultamento: 'Central',
    inicio_velorio: '2026-06-25T10:00:00Z',
    status: 'nao_iniciado',
  },
]

describe('filtrarVelorios', () => {
  it('filtra por termo no nome ou número de registro', () => {
    expect(filtrarVelorios(VELORIOS, { termo: 'ana', filtros: FILTROS_VAZIOS })).toHaveLength(1)
    expect(filtrarVelorios(VELORIOS, { termo: 'REG-002', filtros: FILTROS_VAZIOS })).toHaveLength(1)
  })

  it('filtra por funerária', () => {
    const res = filtrarVelorios(VELORIOS, {
      termo: '',
      filtros: { ...FILTROS_VAZIOS, funeraria: 'Luz' },
    })
    expect(res.map((v) => v.numero_registro)).toEqual(['REG-001', 'REG-003'])
  })

  it('filtra por intervalo de início', () => {
    const res = filtrarVelorios(VELORIOS, {
      termo: '',
      filtros: { ...FILTROS_VAZIOS, inicio_de: '2026-06-15', inicio_ate: '2026-06-22' },
    })
    expect(res.map((v) => v.numero_registro)).toEqual(['REG-002'])
  })

  it('ignora o intervalo quando ignorarIntervalo é true', () => {
    const res = filtrarVelorios(VELORIOS, {
      termo: '',
      filtros: { ...FILTROS_VAZIOS, inicio_de: '2026-06-22', inicio_ate: '2026-06-15' },
      ignorarIntervalo: true,
    })
    expect(res).toHaveLength(3)
  })
})

describe('validarIntervalo', () => {
  it('detecta intervalo invertido', () => {
    expect(validarIntervalo({ inicio_de: '2026-06-22', inicio_ate: '2026-06-15' })).toBe(true)
    expect(validarIntervalo({ inicio_de: '2026-06-15', inicio_ate: '2026-06-22' })).toBe(false)
  })
})

describe('contarPorStatus', () => {
  it('conta total e por status', () => {
    expect(contarPorStatus(VELORIOS)).toEqual({
      todos: 3,
      em_andamento: 1,
      nao_iniciado: 1,
      concluido: 1,
    })
  })
})

describe('aplicarFiltroStatus', () => {
  it('mantém só os status da lista', () => {
    expect(aplicarFiltroStatus(VELORIOS, ['concluido'])).toHaveLength(1)
  })

  it('retorna tudo para "todos"', () => {
    expect(aplicarFiltroStatus(VELORIOS, 'todos')).toHaveLength(3)
  })
})

describe('criarOpcoesFiltro', () => {
  it('gera opções únicas e ordenadas', () => {
    const opcoes = criarOpcoesFiltro(VELORIOS)
    expect(opcoes.funeraria).toEqual(['Luz', 'Paz'])
    expect(opcoes.sala_velorio).toEqual(['Sala A', 'Sala B'])
  })
})

describe('contarFiltrosAtivos', () => {
  it('conta apenas campos preenchidos', () => {
    expect(contarFiltrosAtivos(FILTROS_VAZIOS)).toBe(0)
    expect(contarFiltrosAtivos({ ...FILTROS_VAZIOS, funeraria: 'Luz', sala_velorio: 'A' })).toBe(2)
  })
})
