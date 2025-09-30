"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/store/supabase";

interface Transaction {
  id: string;
  user_id: string;
  type: "debit" | "credit";
  description: string;
  amount: number;
  date: string;
}

export default function TransactionHis({ userId }: { userId: string }) {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: user, error: userError } = await supabase
        .from("citisignup")
        .select("account_balance")
        .eq("id", userId)
        .single();

      if (!userError && user) {
        setBalance(user.account_balance);
      } else {
        console.error("Error fetching balance:", userError);
      }

      // Get transactions
      const { data: tx, error: txError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (!txError && tx) {
        setTransactions(tx as Transaction[]);
      } else {
        console.error("Error fetching transactions:", txError);
      }
    };

    fetchData();
  }, [userId]);

  // Realtime subscriptions
  useEffect(() => {
    // Listen for new transactions
    const txChannel = supabase
      .channel("transactions-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setTransactions((prev) => [payload.new as Transaction, ...prev]);
        }
      )
      .subscribe();

    // Listen for balance updates
    const balanceChannel = supabase
      .channel("balance-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "citisignup",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setBalance(payload.new.account_balance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(txChannel);
      supabase.removeChannel(balanceChannel);
    };
  }, [userId]);

  return (
    <div className="max-w-md mx-auto">
      {/* <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700">Current Balance</h2>
        <p className="text-2xl font-semibold text-green-600 mt-2">
          ${balance.toFixed(2)}
        </p>
      </div> */}

      <div className="bg-white shadow-md rounded-sm p-3">
        <h3 className="text-md font-bold text-gray-700 mb-3">
          Transaction History
        </h3>
        <ul>
          {transactions.map((t) => (
            <li key={t.id} className="border-b py-2">
              <div className="flex w-72 justify-between">
                <span>{t.description}</span>
                <span
                  className={
                    t.type === "debit" ? "text-red-500" : "text-green-600"
                  }
                >
                  {t.type === "debit" ? "-" : "+"}${t.amount.toFixed(2)}
                </span>
              </div>
              <small className="text-gray-400">
                {new Date(t.date).toLocaleString()}
              </small>
            </li>
          ))}
          {transactions.length === 0 && (
            <li className="text-gray-500 text-sm">No transactions yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}
