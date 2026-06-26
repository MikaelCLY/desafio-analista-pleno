const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createVeloriosController } = require('./veloriosController')

function makeRes() {
  const headers = {}
  return {
    headers,
    body: undefined,
    setHeader(name, value) {
      headers[name] = value
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

test('listarTodos responde com a lista do service', async () => {
  const velorios = [{ id: 1 }]
  const controller = createVeloriosController({
    veloriosService: { listarTodos: async () => velorios },
    bannerService: {},
  })
  const res = makeRes()
  let nextErr = null

  await controller.listarTodos({}, res, (err) => {
    nextErr = err
  })

  assert.deepEqual(res.body, velorios)
  assert.equal(nextErr, null)
})

test('listarTodos encaminha erro para next', async () => {
  const erro = new Error('falha')
  const controller = createVeloriosController({
    veloriosService: {
      listarTodos: async () => {
        throw erro
      },
    },
    bannerService: {},
  })
  let nextErr = null

  await controller.listarTodos({}, makeRes(), (err) => {
    nextErr = err
  })

  assert.equal(nextErr, erro)
})

test('gerarBanner define headers de PDF e faz pipe do documento', async () => {
  const piped = []
  const doc = {
    pipe(target) {
      piped.push(target)
    },
    end() {
      this.ended = true
    },
  }
  const controller = createVeloriosController({
    veloriosService: {
      buscarParaBanner: async () => ({ numero_registro: 'REG-9' }),
    },
    bannerService: { gerar: () => doc },
  })
  const res = makeRes()

  await controller.gerarBanner({ params: { id: '9' } }, res, () => {})

  assert.equal(res.headers['Content-Type'], 'application/pdf')
  assert.equal(res.headers['Content-Disposition'], 'attachment; filename="banner-REG-9.pdf"')
  assert.deepEqual(piped, [res])
  assert.equal(doc.ended, true)
})

test('gerarBanner encaminha erro para next', async () => {
  const erro = new Error('sem velório')
  const controller = createVeloriosController({
    veloriosService: {
      buscarParaBanner: async () => {
        throw erro
      },
    },
    bannerService: {},
  })
  let nextErr = null

  await controller.gerarBanner({ params: { id: '1' } }, makeRes(), (err) => {
    nextErr = err
  })

  assert.equal(nextErr, erro)
})
