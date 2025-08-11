import React from 'react';

export default function AccountCard({ account }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      flex: '1 1 calc(33% - 1rem)',
      minWidth: '250px'
    }}>
      <h3 style={{ color: '#4169E1', margin: 0 }}>{account.name}</h3>
      <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
        Balance: ${account.balance.toLocaleString()}
      </p>
    </div>
  );
}
