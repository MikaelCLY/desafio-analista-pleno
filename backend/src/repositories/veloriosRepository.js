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

function createVeloriosRepository(db) {
  return {
    async findByLocalAndStatus(localVelorio, status) {
      const { rows } = await db.query(`
        SELECT ${SELECT_FIELDS}
        WHERE v.local_velorio = $1
          AND ${STATUS_SQL} = $2
        ORDER BY v.inicio_velorio
      `, [localVelorio, status])

      return rows
    },

    async findById(id) {
      const { rows } = await db.query(
        `SELECT ${SELECT_FIELDS} WHERE v.id = $1`,
        [id]
      )

      return rows[0] ?? null
    },
  }
}

module.exports = { createVeloriosRepository }
