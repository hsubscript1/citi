"use client";
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
import Transfer from "./transfer";
import TransactionHis from "./transactionalHis";
import Electricity from "./Elect/electricity";
import ElectricityForm from "./Elect/electricityForm";
import LoanPage from "./loan/loanPage";
import InvestmentsPage from "./investment/investment";

const BankingDetails: React.FC = () => {
  const { user, currentView, setUser } = useAppStore();

  // --- format helpers ---
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

  // --- account state ---
  const [account, setAccount] = useState<Account>({
    balance: user?.accountBalance,
    lastUpdated: formatCustomDate(new Date()),
    timeUpdated: formatCustomTime(new Date()),
    currency: "$",
    accountNumber: user?.accountNumber,
  });

  useEffect(() => {
    setAccount((prev) => ({
      ...prev,
      lastUpdated: formatCustomDate(new Date()),
      timeUpdated: formatCustomTime(new Date()),
    }));
  }, []);

  // --- dummy transactions ---
  const [transactions] = useState<Transaction[]>([
    { id: "1", type: "debit", description: "Grocery Store", amount: 85.2, date: "2023-06-15T14:30:00" },
    { id: "2", type: "credit", description: "Salary Deposit", amount: 3500.0, date: "2023-06-14T09:15:00" },
    { id: "3", type: "debit", description: "Electric Bill", amount: 120.5, date: "2023-06-12T16:45:00" },
    { id: "4", type: "debit", description: "Netflix Subscription", amount: 15.99, date: "2023-06-10T08:00:00" },
    { id: "5", type: "credit", description: "Transfer from Alex", amount: 250.0, date: "2023-06-08T11:20:00" },
  ]);

  // --- card state ---
  const [card, setCard] = useState<Card>({
    id: `${user?.id}`,
    cardNumber: `${user?.cardNumber}`,
    expiryDate: "12/35",
    cvv: "123",
    cardHolder: user ? `${user.firstName} ${user.lastName}` : "Card Holder",
    type: "visa",
  });

  useEffect(() => {
    if (user) {
      setCard((prev) => ({
        ...prev,
        cardHolder: `${user.firstName} ${user.lastName}`,
      }));
    }
  }, [user]);



  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceCard account={account} user={user} />
              <QuickActions />

              <div className="mt-6 md:hidden flex flex-col gap-6">
{user?.id && <TransactionHis userId={user.id} />}
                <CreditCard card={card} />
              </div>

              <div className="mt-6 md:flex hidden flex-col gap-6">
                <CreditCard card={card} />
              </div>
            </div>

            <div className="lg:col-span-1 md:flex hidden">
{user?.id && <TransactionHis userId={user.id} />}
            </div>
          </div>
        );

      case "settings":
        return <UserSettings user={user} onUpdateUser={handleUpdateUser} />;

      case "electricity":
        return <ElectricityForm />;
case "loan":
        return <LoanPage user={user}/>;
     case 'invest': 
     return <InvestmentsPage />;
      case "spend":
        return (
          <div className="mt-8">
            <Transfer  />
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
404          </div>
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