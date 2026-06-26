export const FILTROS_VAZIOS = {
  funeraria: '',
  sala_velorio: '',
  local_sepultamento: '',
  inicio_de: '',
  inicio_ate: '',
}

export const STATUS_INICIAIS = ['em_andamento', 'nao_iniciado', 'concluido']

const CAMPOS_OPCOES = ['funeraria', 'sala_velorio', 'local_sepultamento']

const statusInicial = {
  todos: 0,
  em_andamento: 0,
  nao_iniciado: 0,
  concluido: 0,
}

export function criarOpcoesFiltro(velorios) {
  return CAMPOS_OPCOES.reduce((opcoes, campo) => {
    opcoes[campo] = [...new Set(velorios.map((v) => v[campo]).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'pt-BR')
    )

    return opcoes
  }, {})
}

export function validarIntervalo(filtros) {
  return (
    !!filtros.inicio_de &&
    !!filtros.inicio_ate &&
    new Date(filtros.inicio_de) > new Date(filtros.inicio_ate)
  )
}

export function filtrarVelorios(velorios, { termo, filtros, ignorarIntervalo = false }) {
  const termoNormalizado = termo.trim().toLowerCase()

  return velorios.filter((velorio) => {
    if (termoNormalizado) {
      const numeroRegistro = velorio.numero_registro.toLowerCase()
      const nomeCompleto = velorio.nome_completo.toLowerCase()

      if (
        !numeroRegistro.includes(termoNormalizado) &&
        !nomeCompleto.includes(termoNormalizado)
      ) {
        return false
      }
    }

    if (filtros.funeraria && velorio.funeraria !== filtros.funeraria) return false
    if (filtros.sala_velorio && velorio.sala_velorio !== filtros.sala_velorio) return false
    if (
      filtros.local_sepultamento &&
      velorio.local_sepultamento !== filtros.local_sepultamento
    ) {
      return false
    }

    if (!ignorarIntervalo) {
      const inicioVelorio = new Date(velorio.inicio_velorio).getTime()
      if (filtros.inicio_de && inicioVelorio < new Date(filtros.inicio_de).getTime()) return false
      if (filtros.inicio_ate && inicioVelorio > new Date(filtros.inicio_ate).getTime()) return false
    }

    return true
  })
}

export function contarPorStatus(velorios) {
  return velorios.reduce(
    (counts, velorio) => {
      counts.todos += 1
      if (counts[velorio.status] !== undefined) counts[velorio.status] += 1
      return counts
    },
    { ...statusInicial }
  )
}

export function aplicarFiltroStatus(velorios, status) {
  if (status === 'todos') return velorios
  if (Array.isArray(status)) return velorios.filter((velorio) => status.includes(velorio.status))
  return velorios.filter((velorio) => velorio.status === status)
}

export function contarFiltrosAtivos(filtros) {
  return Object.values(filtros).filter(Boolean).length
}
