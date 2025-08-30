import React, { useState } from 'react';
import { Trash2, Filter } from 'lucide-react';
import { categories } from '../data/categories.js';

export const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const typeMatch = filter === 'all' || transaction.type === filter;
    const categoryMatch = categoryFilter === 'all' || transaction.category === categoryFilter;
    return typeMatch && categoryMatch;
  });

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="transaction-list">
      <div className="transaction-filters">
        <h2>Recent Transactions</h2>
        
        <div className="filter-group">
          <Filter size={16} color="#6b7280" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <h3>No transactions found</h3>
          <p>Start by adding your first transaction above</p>
        </div>
      ) : (
        <div className="transactions-container">
          {filteredTransactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-meta">
                    <span className={`transaction-type ${transaction.type}`}>
                      {transaction.type}
                    </span>
                    <span className="transaction-category">
                      {getCategoryName(transaction.category)}
                    </span>
                    <span className="transaction-date">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                  <p className="transaction-description">{transaction.description}</p>
                </div>
                
                <div className="transaction-actions">
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="delete-button"
                    title="Delete transaction"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};