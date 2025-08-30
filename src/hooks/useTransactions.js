import { useState, useEffect } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage.js';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = loadTransactions();
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
  };
};