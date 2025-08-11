import React from 'react';
import AccountCard from './AccountCard';

export default function Dashboard({ accounts }) {
  return (
    <div style={{ backgroundColor: '#f0f4ff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: '#4169E1', textAlign: 'center' }}>Your Accounts</h1>

      <h2 style={{ color: '#4169E1' }}>Current Accounts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {accounts.current.map(acc => (
          <AccountCard key={acc.id} account={acc} />
        ))}
      </div>

      <h2 style={{ color: '#4169E1', marginTop: '2rem' }}>Savings Accounts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {accounts.savings.map(acc => (
          <AccountCard key={acc.id} account={acc} />
        ))}
      </div>
    </div>
  );
}
