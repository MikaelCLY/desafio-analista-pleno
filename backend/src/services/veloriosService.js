const { toVelorioDto, toVeloriosDto } = require('../dto/velorioDto')
const { AppError } = require('../errors/AppError')
const { ACTIVE_STATUS, MEMORIAL_LOCAL } = require('../config/velorios')

function createVeloriosService(
  veloriosRepository,
  { activeStatus = ACTIVE_STATUS, memorialLocal = MEMORIAL_LOCAL } = {}
) {
  return {
    async listarTodos() {
      const velorios = await veloriosRepository.findByLocalAndStatus(memorialLocal, activeStatus)
      return toVeloriosDto(velorios)
    },

    async buscarParaBanner(id) {
      const velorio = await veloriosRepository.findById(id)

      if (!velorio) {
        throw new AppError('Atendimento não encontrado', 404)
      }

      return toVelorioDto(velorio)
    },
  }
}

module.exports = { createVeloriosService }
