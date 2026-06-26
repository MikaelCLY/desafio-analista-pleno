const { test, mock } = require('node:test')
const assert = require('node:assert/strict')
const { errorHandler } = require('./errorHandler')
const { AppError } = require('../errors/AppError')

function makeRes() {
  return {
    statusCode: undefined,
    body: undefined,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

test('mapeia AppError para o seu statusCode e mensagem', () => {
  const res = makeRes()

  errorHandler(new AppError('Não encontrado', 404), {}, res, () => {})

  assert.equal(res.statusCode, 404)
  assert.deepEqual(res.body, { error: 'Não encontrado' })
})

test('erro genérico vira 500 com mensagem padrão', () => {
  const res = makeRes()
  mock.method(console, 'error', () => {})

  errorHandler(new Error('boom'), {}, res, () => {})

  assert.equal(res.statusCode, 500)
  assert.deepEqual(res.body, { error: 'Erro interno' })
  mock.restoreAll()
})
