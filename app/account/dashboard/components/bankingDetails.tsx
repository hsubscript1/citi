'use client';
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Transaction, Account, Card, User } from "./type";
import BalanceCard from "./balanceCard";
import QuickActions from "./quickActions";
import CreditCard from "./creditCard";
import TransactionHistory from "./transactionalHis";
import UserSettings from "./userSettings";
import { useAppStore } from "@/app/store/useApp";
import Layout from "../layout";

const BankingDetails: React.FC = () => {
  const { user, currentView, setUser } = useAppStore();

  const formatCustomTime = (date: Date): string =>
    date.toLocaleTimeString("en-GB", { hour12: false });

  const formatCustomDate = (date: Date): string => {
    const time = date.toLocaleTimeString("en-GB", { hour12: false });
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date
      .toLocaleDateString("en-US", { month: "long" })
      .toUpperCase();
    const year = date.getFullYear();

    return `${time}, ${dayName}, ${day} ${month} ${year}`;
  };

  const [account, setAccount] = useState<Account>({
    balance: 12560.75,
    lastUpdated: formatCustomDate(new Date()),
    timeUpdated: formatCustomTime(new Date()),
    currency: "$",
    accountNumber: 8078168064,
  });

  useEffect(() => {
    setAccount((prev) => ({
      ...prev,
      lastUpdated: formatCustomDate(new Date()),
    }));
  }, []);

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "debit",
      description: "Grocery Store",
      amount: 85.2,
      date: "2023-06-15T14:30:00",
    },
    {
      id: "2",
      type: "credit",
      description: "Salary Deposit",
      amount: 3500.0,
      date: "2023-06-14T09:15:00",
    },
    {
      id: "3",
      type: "debit",
      description: "Electric Bill",
      amount: 120.5,
      date: "2023-06-12T16:45:00",
    },
    {
      id: "4",
      type: "debit",
      description: "Netflix Subscription",
      amount: 15.99,
      date: "2023-06-10T08:00:00",
    },
    {
      id: "5",
      type: "credit",
      description: "Transfer from Alex",
      amount: 250.0,
      date: "2023-06-08T11:20:00",
    },
  ]);

  const [card, setCard] = useState<Card>({
    id: "1",
    cardNumber: "4234567890123456",
    expiryDate: "12/25",
    cvv: "123",
    cardHolder: `${user.firstName} ${user.lastName}`,
    type: "visa",
  });

  const handleActionSelect = (action: string) => {
    console.log(`Selected action: ${action}`);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setCard((prev) => ({
      ...prev,
      cardHolder: `${updatedUser.firstName} ${updatedUser.lastName}`,
    }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceCard account={account} user={user} />
              <QuickActions onActionSelect={handleActionSelect} />

              <div className="mt-6 md:hidden flex flex-col gap-6">
                <TransactionHistory transactions={transactions} />
                <CreditCard card={card} />
              </div>

              <div className="mt-6 md:flex hidden flex-col gap-6">
                <CreditCard card={card} />
              </div>
            </div>

            <div className="lg:col-span-1 md:flex hidden">
              <TransactionHistory transactions={transactions} />
            </div>
          </div>
        );

      case "settings":
        return <UserSettings user={user} onUpdateUser={handleUpdateUser} />;

      case "send":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mt-2">
              Feature to send money coming soon.
            </p>
          </div>
        );

      case "pay":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mt-2">
              Feature to handle bills and payments coming soon.
            </p>
          </div>
        );

      case "card":
        return (
          <div className="mt-8 rounded-lg shadow">
            <CreditCard card={card} />
          </div>
        );

      default:
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            {/* <h2 className="text-2xl font-bold text-gray-800">
              {currentView} View
            </h2> */}
            <p className="text-gray-600 mt-2">This feature is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Banking Dashboard</title>
        <meta name="description" content="Modern banking interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{renderCurrentView()}</Layout>
    </>
  );
};

export default BankingDetails;
