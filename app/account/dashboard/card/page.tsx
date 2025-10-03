'use client';
import React, { useEffect, useState } from 'react';
import CreditCard from '../components/creditCard';
import { useAppStore } from '@/app/store/useApp';
import { Card } from '../components/type';

const Page = () => {
  const { user } = useAppStore();

  const [card, setCard] = useState<Card>({
    id: '',
    cardNumber: '',
    expiryDate: '12/35',
    cvv: '123',
    cardHolder: 'Card Holder',
    type: 'visa',
  });

  useEffect(() => {
    if (user) {
      setCard({
        id: user.id,
        cardNumber: user.cardNumber || '',
        expiryDate: '12/35',
        cvv: '123',
        cardHolder: `${user.firstName} ${user.lastName}`,
        type: 'visa',
      });
    }
  }, [user]);

  return (
    <div className="mt-28">
      <CreditCard card={card} />
    </div>
  );
};

export default Page;
