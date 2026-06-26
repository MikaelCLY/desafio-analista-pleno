const { Pool } = require('pg')

function createPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL })
}

function createDb(pool) {
  return { query: (text, params) => pool.query(text, params) }
}

module.exports = { createPool, createDb }
