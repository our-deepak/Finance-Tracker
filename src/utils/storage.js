const STORAGE_KEY = 'finance_tracker_transactions';

export const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const loadTransactions = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};