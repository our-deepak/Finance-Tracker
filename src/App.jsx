import React from 'react';
import { Header } from './components/Header.jsx';
import { Balance } from './components/Balance.jsx';
import { TransactionForm } from './components/TransactionForm.jsx';
import { TransactionList } from './components/TransactionList.jsx';
import { useTransactions } from './hooks/useTransactions.js';

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <Balance transactions={transactions} />
        <TransactionForm onAddTransaction={addTransaction} />
        <TransactionList 
          transactions={transactions} 
          onDeleteTransaction={deleteTransaction} 
        />
      </main>
    </div>
  );
}

export default App;