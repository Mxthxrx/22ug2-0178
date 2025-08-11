import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        onLogin(data);
      } else {
        alert('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Unable to connect to server');
    }
  };

  return (
    <div style={{
      backgroundColor: '#4169E1',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          color: '#4169E1',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          width: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Bank Login</h2>
        <input
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#4169E1',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            width: '100%',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
