const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

// Create table if not exists
async function initializeDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      );
      INSERT INTO items (name) SELECT 'Sample Item' WHERE NOT EXISTS (SELECT 1 FROM items LIMIT 1);
    `);
  } finally {
    client.release();
  }
}

initializeDb();
