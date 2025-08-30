import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { categories } from '../data/categories.js';
import { generateId } from '../utils/storage.js';

export const TransactionForm = ({ onAddTransaction }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || !description || !category) return;

    const transaction = {
      id: generateId(),
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
    };

    onAddTransaction(transaction);
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="type-buttons">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`type-button ${type === 'income' ? 'active income' : 'inactive'}`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`type-button ${type === 'expense' ? 'active expense' : 'inactive'}`}
          >
            Expense
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select category</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          <Plus size={20} />
          Add Transaction
        </button>
      </form>
    </div>
  );
};