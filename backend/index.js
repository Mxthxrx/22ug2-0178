import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'mysql_db',
  user: 'root',
  password: 'rootpassword',
  database: 'bankdb'
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const conn = await mysql.createConnection(dbConfig);

  const [rows] = await conn.execute(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password]
  );

  if (rows.length > 0) {
    const [current] = await conn.execute(
      'SELECT * FROM accounts WHERE type="current" AND user_id=?',
      [rows[0].id]
    );
    const [savings] = await conn.execute(
      'SELECT * FROM accounts WHERE type="savings" AND user_id=?',
      [rows[0].id]
    );

    res.json({
      username,
      accounts: {
        current,
        savings
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Test endpoint
app.get('/', (req, res) => {
  res.send('Bank API running');
});

app.listen(5001, () => {
  console.log('Backend running on port 5001');
});
