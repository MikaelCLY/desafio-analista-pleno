function toVelorioDto(velorio) {
  return {
    id: velorio.id,
    numero_registro: String(velorio.numero_registro ?? ''),
    nome_completo: velorio.nome_completo,
    sala_velorio: velorio.sala_velorio,
    inicio_velorio: velorio.inicio_velorio,
    inicio_sepultamento: velorio.inicio_sepultamento,
    local_sepultamento: velorio.local_sepultamento,
    funeraria: velorio.funeraria,
    status: velorio.status,
  }
}

function toVeloriosDto(velorios) {
  return velorios.map(toVelorioDto)
}

module.exports = { toVelorioDto, toVeloriosDto }
