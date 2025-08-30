import React from 'react';
import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <Wallet color="white" size={24} />
        </div>
        <div>
          <h1 className="header-title">Finance Tracker</h1>
          <p className="header-subtitle">Manage your income and expenses</p>
        </div>
      </div>
    </header>
  );
};