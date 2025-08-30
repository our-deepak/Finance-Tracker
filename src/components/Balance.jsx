import React from 'react';
import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

export const Balance = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="balance-grid">
      <div className="balance-card income">
        <div className="balance-card-content">
          <div className="balance-card-info">
            <h3>Total Income</h3>
            <p className="income">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="balance-card-icon income">
            <TrendingUp color="#10b981" size={24} />
          </div>
        </div>
      </div>

      <div className="balance-card expense">
        <div className="balance-card-content">
          <div className="balance-card-info">
            <h3>Total Expenses</h3>
            <p className="expense">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="balance-card-icon expense">
            <TrendingDown color="#ef4444" size={24} />
          </div>
        </div>
      </div>

      <div className="balance-card balance">
        <div className="balance-card-content">
          <div className="balance-card-info">
            <h3>Net Balance</h3>
            <p className={balance >= 0 ? 'positive' : 'negative'}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="balance-card-icon balance">
            <IndianRupee color="#3b82f6" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};