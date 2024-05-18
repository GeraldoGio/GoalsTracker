const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'budget_tracker',
  password: '',
  port: 5432, 
});

// Routes
// Mendapatkan semua item
app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menambah item baru (Create)
app.post('/api/items', async (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required' });
  }

  try {
    const { rows } = await pool.query('INSERT INTO items (name, amount) VALUES ($1, $2) RETURNING *', [name, amount]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Memperbarui item (Update)
app.put('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required' });
  }

  try {
    const { rows } = await pool.query('UPDATE items SET name = $1, amount = $2 WHERE id = $3 RETURNING *', [name, amount, id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menghapus item (Delete)
app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
