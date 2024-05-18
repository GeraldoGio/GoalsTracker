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