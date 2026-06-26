const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createBannerService } = require('./banner')
const { AppError } = require('../errors/AppError')

function makeFakeDoc() {
  const calls = []
  const proxy = new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === 'page') return { width: 595, height: 842 }
        return (...args) => {
          calls.push({ method: String(prop), args })
          return proxy
        }
      },
    }
  )
  return { doc: proxy, calls }
}

const VELORIO_COMPLETO = {
  nome_completo: 'Maria Silva',
  inicio_velorio: '2026-06-26T10:00:00Z',
  inicio_sepultamento: '2026-06-26T14:00:00Z',
  local_sepultamento: 'Cemitério Central',
  funeraria: 'Funerária Luz',
  numero_registro: 'REG-001',
}

function buildService(overrides = {}) {
  return createBannerService({
    assetResolver: { exists: () => false },
    dateFormatter: (v) => `data:${v}`,
    generatedAtFormatter: () => 'agora',
    ...overrides,
  })
}

test('gerar lança AppError 422 quando falta campo obrigatório', () => {
  let chamou = false
  const service = buildService({
    createDocument: () => {
      chamou = true
      return makeFakeDoc().doc
    },
  })

  const { funeraria, ...incompleto } = VELORIO_COMPLETO

  assert.throws(
    () => service.gerar(incompleto),
    (err) => err instanceof AppError && err.statusCode === 422
  )
  assert.equal(chamou, false, 'não deve criar o documento se a validação falha')
})

test('gerar retorna o documento e desenha o conteúdo do velório', () => {
  const fake = makeFakeDoc()
  const service = buildService({ createDocument: () => fake.doc })

  const doc = service.gerar(VELORIO_COMPLETO)

  assert.equal(doc, fake.doc)
  const textos = fake.calls.filter((c) => c.method === 'text').map((c) => c.args[0])
  assert.ok(textos.includes('Maria Silva'), 'desenha o nome do falecido')
})
