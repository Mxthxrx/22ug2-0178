# Docker-Web-app
A functional Dockerized multi-service web app with persistent storage, plus a set of shell scripts to prepare, start, stop, and remove everything.
1. Web App Architecture
Services:

Frontend: React app (Royal Blue & White theme)

Backend: Node.js Express API (handles login, account queries)

Database: PostgreSQL or MySQL (stores users & account details, persistent volume)

Flow:

User visits http://localhost:3000 → Login page appears.

User logs in → backend checks DB, returns token & account data.

Dashboard page shows two sections:

Current Accounts

Savings Accounts

UI styled in Royal Blue (#4169E1) and White (#FFFFFF).

2. React Frontend (Example Structure)
File Structure

pgsql
Copy
Edit
frontend/
  src/
    components/
      LoginPage.js
      Dashboard.js
      AccountCard.js
    App.js
    index.js
  package.json
Example: LoginPage.js

jsx
Copy
Edit
import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      onLogin(data);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ backgroundColor: '#4169E1', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', color: '#4169E1', padding: '2rem', borderRadius: '10px' }}>
        <h2>Bank Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" style={{ backgroundColor: '#4169E1', color: 'white' }}>Login</button>
      </form>
    </div>
  );
}
Example: Dashboard.js

jsx
Copy
Edit
import React from 'react';
import AccountCard from './AccountCard';

export default function Dashboard({ accounts }) {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f4ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#4169E1' }}>Your Accounts</h1>
      <h2>Current Accounts</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {accounts.current.map(acc => <AccountCard key={acc.id} account={acc} />)}
      </div>
      <h2>Savings Accounts</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {accounts.savings.map(acc => <AccountCard key={acc.id} account={acc} />)}
      </div>
    </div>
  );
}
3. Backend API (Node.js Express)
File Structure

pgsql
Copy
Edit
backend/
  server.js
  package.json
Example: server.js

js
Copy
Edit
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const mockUser = { username: 'john', password: '1234' };
const mockAccounts = {
  current: [{ id: 1, name: 'Current Account 1', balance: 2500 }],
  savings: [{ id: 2, name: 'Savings Account 1', balance: 10000 }]
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === mockUser.username && password === mockUser.password) {
    res.json({ token: 'fake-jwt-token', accounts: mockAccounts });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
4. Database (Optional)
If you want persistent real data:

Replace mock data with DB queries.

PostgreSQL/MySQL container with myapp-db-data volume.

5. Docker Setup
You’ll have three containers:

React (served by Nginx)

Node.js backend

Database (persistent volume)

Example docker-compose.yaml

yaml
Copy
Edit
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - myapp-network

  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASS: rootpass
    depends_on:
      - db
    networks:
      - myapp-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: bankdb
    volumes:
      - myapp-db-data:/var/lib/mysql
    networks:
      - myapp-network

networks:
  myapp-network:

volumes:
  myapp-db-data:
6. Align to Assignment
prepare-app.sh → create volume/network, build images.

start-app.sh → run all containers, ensure restart policies.

stop-app.sh → stop containers without removing volumes.

remove-app.sh → remove all containers, networks, volumes.
