"use client";
import React, { useState, useRef, useEffect } from "react";
import Electricity from "./electricity";
import { useAppStore } from "@/app/store/useApp";
import { supabase } from "@/app/store/supabase";

type FormStep = "bill-details" | "pin-verification" | "confirmation";

export default function ElectricityForm() {
  const [customerName, setCustomerName] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"paid" | "unpaid">("unpaid");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [currentStep, setCurrentStep] = useState<FormStep>("bill-details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "error"
  >("pending");

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

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError("");
    if (newPin.every(Boolean) && index === 3) {
      verifyPin(newPin.join(""));
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const verifyPin = async (enteredPin: string) => {
    const balance = BALANCE ?? 0;
    setIsProcessing(true);
    setPaymentStatus("pending");

    await new Promise((r) => setTimeout(r, 1000));

    if (enteredPin === `${PIN}`) {
      if (amount > balance) {
        setPinError("Insufficient balance for this payment.");
        setPaymentStatus("error");
        setIsProcessing(false);
        return;
      }

      // Deduct amount from balance
      const newBalance = balance - amount;

      const { error } = await supabase
        .from("citisignup")
        .update({ account_balance: newBalance })
        .eq("id", user?.id);

      if (error) {
        setPinError("Payment failed. Please try again.");
        setPaymentStatus("error");
        setIsProcessing(false);
        return;
      }

      // Update global state
      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      // Mark bill as paid
      setStatus("paid");
      setPaymentStatus("success");
      setCurrentStep("confirmation");
    } else {
      setPinError("Invalid PIN. Please try again.");
      setPaymentStatus("error");
      setPin(["", "", "", ""]);
      pinInputRefs.current[0]?.focus();
    }

    setIsProcessing(false);
  };

  const handlePayNow = () => {
    if (!customerName || !meterNumber || amount <= 0 || !dueDate) {
      alert("Please fill in all bill details before proceeding to payment.");
      return;
    }
    setCurrentStep("pin-verification");
  };

  const resetForm = () => {
    setCustomerName("");
    setMeterNumber("");
    setAmount(0);
    setDueDate("");
    setStatus("unpaid");
    setPin(["", "", "", ""]);
    setPinError("");
    setCurrentStep("bill-details");
    setPaymentStatus("pending");
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className=" p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-blue-800">
                Electricity Bill Payment
              </h1>
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>
            <p className="text-blue-800">Pay your electricity bills securely</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                {currentStep === "bill-details" && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Bill Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meter Number *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter meter number"
                        value={meterNumber}
                        onChange={(e) => setMeterNumber(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount ($) *
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={amount || ""}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 p-3 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
                        required
                      />
                    </div>

                    <button
                      onClick={handlePayNow}
                      disabled={
                        !customerName || !meterNumber || amount <= 0 || !dueDate
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      Proceed to Payment
                    </button>
                  </>
                )}

                {currentStep === "pin-verification" && (
                  <div className="space-y-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("bill-details")}
                      className="text-blue-600 flex items-center gap-1 font-medium"
                    >
                      ← Back to Bill Details
                    </button>

                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Secure PIN Verification
                      </h3>
                      <p className="text-gray-600">
                        Enter your 4-digit PIN to confirm payment
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 mb-4">
                      {pin.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            pinInputRefs.current[i] = el;
                          }}
                          type="password"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(i, e.target.value)}
                          onKeyDown={(e) => handlePinKeyDown(i, e)}
                          className="w-14 h-14 text-xl text-center border-2
                           border-gray-300 rounded-lg focus:border-blue-500 
                           focus:ring-2 focus:ring-blue-200 transition-colors"
                        />
                      ))}
                    </div>

                    {pinError && (
                      <div
                        className={`text-center text-sm font-medium ${
                          paymentStatus === "error"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {pinError}
                      </div>
                    )}

                    <button
                      onClick={() => verifyPin(pin.join(""))}
                      disabled={pin.some((d) => !d) || isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg
                        transition-colors duration-200"
                    >
                      {isProcessing
                        ? "Processing Payment..."
                        : "Confirm Payment"}
                    </button>
                  </div>
                )}

                {currentStep === "confirmation" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex
                     items-center justify-center mx-auto">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Payment Successful!
                      </h3>
                      <p className="text-gray-600">
                        Your electricity bill payment of{" "}
                        <span className="font-semibold">
                          ${formatCurrency(amount)}
                        </span>{" "}
                        has been processed successfully.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Transaction Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Meter Number:</span>
                          <span className="font-medium">{meterNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Paid:</span>
                          <span className="font-medium text-blue-600">
                            ${formatCurrency(amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="font-medium">{dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetForm}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                      font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      Pay Another Bill
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Bill Preview
                </h2>
                <div className="sticky top-6">
                  <Electricity
                    provider={`${user?.firstName || "Provider"} ${
                      user?.lastName || ""
                    }`}
                    customerName={customerName || "Customer Name"}
                    meterNumber={meterNumber || "000000"}
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
      </div>
    </div>
  );
}
