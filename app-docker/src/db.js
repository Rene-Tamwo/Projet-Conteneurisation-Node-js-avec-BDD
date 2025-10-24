// simple PG client wrapper
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL options if needed
});

async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

async function init() {
  // create a simple table if not exists (id, name)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
}

module.exports = { query, init, pool };

