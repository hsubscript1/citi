"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/app/store/useApp";
import { supabase } from "@/app/store/supabase";
import Pay from "./pay";

type FormStep = "bill-details" | "pin-verification" | "confirmation";

export default function PayForm() {
  const [billType, setBillType] = useState("Electricity");
  const [customerName, setCustomerName] = useState("");
  const [reference, setReference] = useState(""); // generic
  const [amount, setAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"paid" | "unpaid">("unpaid");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [currentStep, setCurrentStep] = useState<FormStep>("bill-details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState("");

  const { user } = useAppStore();
  const PIN = user?.pin;
  const BALANCE = user?.accountBalance;

  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const filled = pin.filter(Boolean).length;
    if (filled < 4 && pinInputRefs.current[filled]) {
      pinInputRefs.current[filled]?.focus();
    }
  }, [pin]);

  const handlePayNow = () => {
    if (!customerName || !reference || amount <= 0 || !dueDate) {
      alert("Please fill in all bill details before proceeding to payment.");
      return;
    }
    setCurrentStep("pin-verification");
  };

  const resetForm = () => {
    setBillType("Electricity");
    setCustomerName("");
    setReference("");
    setAmount(0);
    setDueDate("");
    setStatus("unpaid");
    setPin(["", "", "", ""]);
    setPinError("");
    setCurrentStep("bill-details");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-800">Pay Your Bills</h1>
            <p className="text-blue-800">Choose a bill and pay securely</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Form */}
            <div className="space-y-6">
              {currentStep === "bill-details" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bill Type *</label>
                    <select
                      value={billType}
                      onChange={(e) => setBillType(e.target.value)}
                      className="w-full border p-3 rounded-lg"
                    >
                      <option>Electricity</option>
                      <option>Water</option>
                      <option>Internet</option>
                      <option>Rent</option>
                      <option>Tuition</option>
                      <option>Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                      className="w-full border p-3 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Reference / Account Number *</label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Enter reference"
                      className="w-full border p-3 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount ($) *</label>
                    <input
                      type="number"
                      value={amount || ""}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full border p-3 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Due Date *</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full border p-3 rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handlePayNow}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                  >
                    Proceed to Payment
                  </button>
                </>
              )}
            </div>

            {/* Right Preview */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Bill Preview</h2>
              <Pay
                provider={`${user?.firstName || "Provider"} ${user?.lastName || ""}`}
                customerName={customerName || "Customer Name"}
                reference={reference || "000000"}
                billType={billType}
                amount={amount}
                dueDate={dueDate || "Not set"}
                status={status}
                onPay={handlePayNow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
