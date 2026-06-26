import { getVelorios } from '../api/velorios'
import { toVeloriosDto } from '../dto/velorioDto'

export async function listarVelorios() {
  const velorios = await getVelorios()
  return toVeloriosDto(velorios)
}
