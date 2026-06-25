const { Router } = require('express')
const db = require('../db')
const gerarBanner = require('../services/banner')

const router = Router()

const STATUS_SQL = `CASE
  WHEN NOW() < v.inicio_velorio THEN 'nao_iniciado'
  WHEN v.fim_velorio IS NULL OR NOW() <= v.fim_velorio THEN 'em_andamento'
  ELSE 'concluido'
END`

const SELECT_FIELDS = `
  v.id,
  r.numero_registro,
  p.nome || ' ' || p.sobrenome AS nome_completo,
  v.sala_velorio,
  v.inicio_velorio,
  v.inicio_sepultamento,
  v.local_sepultamento,
  r.funeraria,
  ${STATUS_SQL} AS status
FROM velorios v
JOIN registros_obitos r ON r.id = v.registro_obito_id
JOIN pessoas p ON p.id = r.pessoa_id`

router.get('/', async (_req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT ${SELECT_FIELDS}
      WHERE ${STATUS_SQL} = 'em_andamento'
      ORDER BY v.inicio_velorio
    `)
    res.json(rows)
  } catch (err) {
    console.error('Erro ao consultar velórios:', err)
    res.status(500).json({ error: 'Erro ao consultar velórios' })
  }
})

router.get('/:id/banner', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT ${SELECT_FIELDS} WHERE v.id = $1`,
      [req.params.id]
    )
    if (!rows.length) {
      return res.status(404).json({ error: 'Atendimento não encontrado' })
    }
    gerarBanner(res, rows[0])
  } catch (err) {
    console.error('Erro ao gerar banner:', err)
    res.status(500).json({ error: 'Erro ao gerar banner' })
  }
})

module.exports = router
