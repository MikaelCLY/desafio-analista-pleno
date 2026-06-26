const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createVeloriosRepository } = require('./veloriosRepository')

test('findByLocal consulta por local_velorio e retorna as linhas', async () => {
  const chamadas = []
  const linhas = [{ id: 1 }, { id: 2 }]
  const db = {
    query: async (text, params) => {
      chamadas.push({ text, params })
      return { rows: linhas }
    },
  }

  const repo = createVeloriosRepository(db)
  const rows = await repo.findByLocal('Memorial X')

  assert.deepEqual(rows, linhas)
  assert.deepEqual(chamadas[0].params, ['Memorial X'])
  assert.match(chamadas[0].text, /WHERE v\.local_velorio = \$1/)
})

test('findById retorna a primeira linha', async () => {
  const db = { query: async () => ({ rows: [{ id: 7 }] }) }
  const repo = createVeloriosRepository(db)

  assert.deepEqual(await repo.findById('7'), { id: 7 })
})

test('findById retorna null quando não há linhas', async () => {
  const db = { query: async () => ({ rows: [] }) }
  const repo = createVeloriosRepository(db)

  assert.equal(await repo.findById('999'), null)
})
