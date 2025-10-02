'use client'
import React, { useState } from "react";
import { User } from "../type";

interface LoanProps {
  user: User | null;
}
const LoanPage:React.FC<LoanProps> = ({user}) => {
  const [form, setForm] = useState({
    amount: "",
    duration: "",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Borrow a Loan
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter your Full Name"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div> */}

            <div>
              <label className="block text-gray-600 mb-1">Loan Amount ($)</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount, you want to borrow"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Duration</label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              >
                <option value="">Select duration</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={form.purpose}
                placeholder="In few words, why do you need a loan"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Apply for Loan
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you, {user ? user.lastName : ''}Your loan request of ${form.amount} for{" "}
              {form.duration} months has been received.  
              Our team will review your request shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanPage;
function useAppStore(): { user: any; } {
  throw new Error("Function not implemented.");
}

