// components/CreditCard.tsx
import React from 'react';
import { Card } from '../components/type';

interface CreditCardProps {
  card: Card;
}

const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80">Card Holder</p>
          <p className="text-lg font-semibold">{card.cardHolder}</p>
        </div>
        <div className="text-3xl">💳</div>
      </div>
      
      <div className="mt-8">
        <p className="text-sm opacity-80">Card Number</p>
        <p className="text-xl tracking-wider">{formatCardNumber(card.cardNumber)}</p>
      </div>
      
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-sm opacity-80">Expiry Date</p>
          <p className="font-medium">{card.expiryDate}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">CVV</p>
          <p className="font-medium">***</p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;