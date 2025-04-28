const express = require('express');
const { Pool } = require('pg');
const client = require('prom-client');

const app = express();
const port = 3000;

// Metrics setup for Prometheus
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const dbClient = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

// Endpoint to get data from PostgreSQL
app.get('/data', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Endpoint to get data from PostgreSQL
app.get('/', async (req, res) => {
  try {
    res.json(`Hello From Your Container running on port: ${port}`);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
