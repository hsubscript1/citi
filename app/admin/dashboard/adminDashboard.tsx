"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  account_balance: number;
  account_number: string;
  card_number: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ 
    account_balance: "", 
    account_number: "", 
    card_number: "" 
  });
  
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!adminToken) {
      console.log("No admin token found");
      return;
    }
    console.log("Fetching users with token:", adminToken.substring(0, 10) + "...");
    
    fetch("/api/admin/users", { headers: { Authorization: `Bearer ${adminToken}` } })
      .then(res => {
        console.log("Users API response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("Users data received:", data);
        setUsers(data.users || []);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, [adminToken]);

  const handleAddBalance = async (userId: string, amount: number) => {
    if (!adminToken) {
      toast.error("No admin token found");
      return;
    }
    setLoading(true);

    console.log("Adding balance to user:", userId, "amount:", amount);

    const res = await fetch("/api/admin/update-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ userId, amount }),
    });
    
    console.log("Add balance response status:", res.status);
    
    const data = await res.json();
    if (res.ok) {
      toast.success("Balance updated!");
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, account_balance: u.account_balance + amount } : u));
    } else {
      toast.error(data.error);
    }
    setLoading(false);
  };

  const startEditing = (user: User) => {
    console.log("Starting edit for user:", user.id);
    setEditingUser(user.id);
    setEditForm({
      account_balance: user.account_balance.toString(),
      account_number: user.account_number || "",
      card_number: user.card_number || ""
    });
  };

  const cancelEditing = () => {
    console.log("Canceling edit");
    setEditingUser(null);
    setEditForm({ account_balance: "", account_number: "", card_number: "" });
  };

  // ✅ simplified version (removed strict validations)
  const saveAccountDetails = async (userId: string) => {
    if (!adminToken) {
      toast.error("No admin token found");
      return;
    }
    
    console.log("Starting saveAccountDetails for user:", userId);
    console.log("Form data:", editForm);

    const balance = parseFloat(editForm.account_balance) || 0;

    setLoading(true);
    console.log("Sending request to API...");

    try {
      const requestBody = { 
        userId, 
        account_balance: balance,
        account_number: editForm.account_number,
        card_number: editForm.card_number
      };
      
      console.log("Request body:", requestBody);

      const res = await fetch("/api/admin/update-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", res.status);
      
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        toast.success("Account details updated!");
        setUsers(prev => prev.map(u => 
          u.id === userId ? { 
            ...u, 
            account_balance: balance,
            account_number: editForm.account_number, 
            card_number: editForm.card_number 
          } : u
        ));
        setEditingUser(null);
      } else {
        toast.error(data.error || "Failed to update account details");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSetBalance = async (userId: string, newBalance: number) => {
    if (!adminToken) {
      toast.error("No admin token found");
      return;
    }
    setLoading(true);

    console.log("Setting balance for user:", userId, "new balance:", newBalance);

    const res = await fetch("/api/admin/set-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ userId, newBalance }),
    });

    console.log("Set balance response status:", res.status);

    const data = await res.json();
    if (res.ok) {
      toast.success("Balance set successfully!");
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, account_balance: newBalance } : u));
    } else {
      toast.error(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Debug Info:</strong> Users loaded: {users.length} | Editing: {editingUser || "None"} | Loading: {loading.toString()}
        </p>
      </div>
      
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Account Number</th>
            <th className="p-2">Card Number</th>
            <th className="p-2">Set Balance</th>
            <th className="p-2">Account Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border">
              <td className="p-2">{user.fname} {user.lname}</td>
              <td className="p-2">{user.email}</td>
              
              {/* Balance Column */}
              <td className="p-2">
                {editingUser === user.id ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.account_balance}
                    onChange={(e) => setEditForm(prev => ({ ...prev, account_balance: e.target.value }))}
                    placeholder="Enter balance"
                    className="border p-1 w-24"
                  />
                ) : (
                  `$${user.account_balance.toFixed(2)}`
                )}
              </td>
              
              {/* Account Number Column */}
              <td className="p-2">
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={editForm.account_number}
                    onChange={(e) => setEditForm(prev => ({ ...prev, account_number: e.target.value }))}
                    placeholder="Enter account number"
                    className="border p-1 w-32"
                  />
                ) : (
                  user.account_number || "Not set"
                )}
              </td>
              
              {/* Card Number Column */}
              <td className="p-2">
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={editForm.card_number}
                    onChange={(e) => setEditForm(prev => ({ ...prev, card_number: e.target.value }))}
                    placeholder="Enter card number"
                    className="border p-1 w-40"
                  />
                ) : (
                  user.card_number ? `${user.card_number.slice(0, 4)} **** **** ${user.card_number.slice(-4)}` : "Not set"
                )}
              </td>
              
              {/* Set Balance Column */}
              <td className="p-2">
                <button
                  onClick={() => {
                    const input = prompt("Enter new balance amount");
                    if (input === null) return; // User cancelled
                    
                    const newBalance = parseFloat(input);
                    if (!isNaN(newBalance)) {
                      handleSetBalance(user.id, newBalance);
                    } else {
                      toast.error("Please enter a valid number");
                    }
                  }}
                  disabled={loading}
                  className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 disabled:opacity-50"
                >
                  Set Balance
                </button>
              </td>
              
              {/* Account Details Column */}
              <td className="p-2">
                {editingUser === user.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveAccountDetails(user.id)}
                      disabled={loading}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save All"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={loading}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit All
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-500">No users found. Check console for errors.</p>
        </div>
      )}
    </div>
  );
}
