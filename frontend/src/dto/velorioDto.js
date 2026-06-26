export function toVelorioDto(velorio) {
  return {
    id: velorio.id,
    numero_registro: String(velorio.numero_registro ?? ''),
    nome_completo: velorio.nome_completo ?? '',
    sala_velorio: velorio.sala_velorio ?? '',
    inicio_velorio: velorio.inicio_velorio ?? null,
    inicio_sepultamento: velorio.inicio_sepultamento ?? null,
    local_sepultamento: velorio.local_sepultamento ?? '',
    funeraria: velorio.funeraria ?? '',
    status: velorio.status ?? 'nao_iniciado',
  }
}

export function toVeloriosDto(velorios) {
  return velorios.map(toVelorioDto)
}
