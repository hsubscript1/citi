// components/TransactionHistory.tsx
import React from 'react';
import { Transaction } from '../components/type';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow h-full">
      <section className='flex justify-between pb-3 mx-auto items-center'>
      <div className="text-gray-800 font-semibold ">Transactions</div>
        <div className=" transition-colors font-semibold">
        View All 
      </div>
      </section>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between gap-10 items-center border-b pb-3">
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
            </div>
            <p className={transaction.type === 'credit' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default TransactionHistory;