const express = require('express');
const { Pool } = require('pg');
const client = require('prom-client');
require('./db');

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
app.post('/data', async (req, res) => {
  const { name } = req.body;  // Get the 'name' from the request body

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const result = await dbClient.query(
      'CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name VARCHAR(100))'
      'INSERT INTO items (name) VALUES ($1) RETURNING *', 
      [name]
    );
    res.status(201).json(result.rows[0]);  // Respond with the inserted row
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
