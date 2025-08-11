import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const [userData, setUserData] = useState(null);

  return userData ? (
    <Dashboard accounts={userData.accounts} />
  ) : (
    <LoginPage onLogin={setUserData} />
  );
}

export default App;
