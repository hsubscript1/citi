"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  RiFileCopy2Line,
  RiArrowLeftLine
} from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";
import { FaChevronDown, FaSearch, FaShieldAlt } from "react-icons/fa";
import { Banks } from "./data/bank";
import { useAppStore } from "@/app/store/useApp";
import { supabase } from "@/app/store/supabase";

interface Bank {
  NAME: string;
  STNAME: string;
  ADDRESS: string;
  ZIP: string;
}

type FormStep = "bank-details" | "amount" | "pin-verification" | "confirmation";

const Transfer = () => {
  const [query, setQuery] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [currentStep, setCurrentStep] = useState<FormStep>("bank-details");

  const { user } = useAppStore();
  const PIN = user?.pin;
  const BALANCE = user?.accountBalance;

  const [isCopied, setIsCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");

  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  useEffect(() => {
    const filled = pin.filter(Boolean).length;
    if (filled < 4 && pinInputRefs.current[filled]) {
      pinInputRefs.current[filled]?.focus();
    }
  }, [pin]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedBank("");
    if (!value.trim()) {
      setBanks([]);
      setIsDropdownOpen(false);
      return;
    }
    setBanks(Banks.filter(b => b.NAME.toLowerCase().includes(value.toLowerCase())));
    setIsDropdownOpen(true);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAccountNumber(text);
    } catch {
      return;
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const verifyBankDetails = async () => {
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 1000));
    const isValid = accountNumber.length >= 10 && selectedBank;
    if (isValid) {
      setVerificationStatus("success");
      setCurrentStep("amount");
    } else {
      setVerificationStatus("error");
    }
    setIsVerifying(false);
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError("");
    if (newPin.every(Boolean) && index === 3) verifyPin(newPin.join(""));
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const verifyPin = async (enteredPin: string) => {
    const balance = BALANCE ?? 0;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1000));

    const transferAmount = parseFloat(amount);

    if (enteredPin === `${PIN}`) {
      if (transferAmount > balance) {
        setPinError("Insufficient balance.");
        setIsProcessing(false);
        return;
      }

      const newBalance = balance - transferAmount;

      const { error } = await supabase
        .from("citisignup")
        .update({ account_balance: newBalance })
        .eq("id", user?.id);

      if (error) {
        setPinError("Failed to update balance. Try again.");
        setIsProcessing(false);
        return;
      }

      useAppStore.setState((prev: any) => ({
        user: {
          ...prev.user,
          accountBalance: newBalance,
        },
      }));

      setCurrentStep("confirmation");
    } else {
      setPinError("Invalid PIN. Please try again.");
      setPin(["", "", "", ""]);
      pinInputRefs.current[0]?.focus();
    }

    setIsProcessing(false);
  };

  const formatCurrency = (val: string) =>
    val ? (+val.replace(/[^\d.]/g, "") || 0).toLocaleString("en-US", { minimumFractionDigits: 2 }) : "";

  const resetForm = () => {
    setQuery(""); setSelectedBank(""); setAccountNumber("");
    setAmount(""); setPin(["", "", "", ""]); setPinError("");
    setCurrentStep("bank-details"); setVerificationStatus("pending");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
    flex items-center justify-center ">
      <div className="w-full max-w-md">
        <div className="shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Bank Transfer</h1>
              <div className="flex items-center gap-2 text-blue-200">
                <FaShieldAlt /><span className="text-sm">Secure</span>
              </div>
            </div>
          </div>

          <form className="p-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === "bank-details") verifyBankDetails();
              if (currentStep === "amount") setCurrentStep("pin-verification");
            }}>

            {currentStep === "bank-details" && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Account Number</label>
                  <div className="flex border rounded-xl overflow-hidden">
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="flex-grow px-4 py-3 outline-none"
                      placeholder="Enter account number"
                    />
                    <button type="button" onClick={handlePaste}
                      className={`px-4 ${isCopied ? "text-green-600" : "text-gray-600"}`}>
                      {isCopied ? "Copied!" : <RiFileCopy2Line />}
                    </button>
                  </div>
                </div>

                <div ref={dropdownRef}>
                  <label className="block text-sm font-semibold mb-2">Choose Bank</label>
                  <div className="relative">
                    <div className="flex border rounded-xl px-4">
                      <div className="mt-4">
                      <TbHomeFilled className="text-gray-400 mr-2" />
                      </div>
                      <input
                        type="text" value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search for a bank..."
                        className="flex-grow py-3 outline-none"
                        onFocus={() => query && setIsDropdownOpen(true)}
                      />
                      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <FaChevronDown className={isDropdownOpen ? "rotate-180" : ""} />
                      </button>
                    </div>
                    {isDropdownOpen && (
                      <ul className="absolute z-10 w-full bg-white border rounded-xl mt-2 max-h-60 overflow-y-auto shadow-lg">
                        {banks.length > 0 ? banks.map((b, i) => (
                          <li key={i} className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => { setSelectedBank(b.NAME); setQuery(b.NAME); setIsDropdownOpen(false); }}>
                            {b.NAME} <span className="text-sm text-gray-500">({b.STNAME})</span>
                          </li>
                        )) : <li className="p-4 text-gray-400 text-center">No banks found</li>}
                      </ul>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={!selectedBank || !accountNumber || isVerifying}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl">
                  {isVerifying ? "Verifying..." : "Continue"}
                </button>
              </>
            )}

            {/* Step 2: Amount */}
            {currentStep === "amount" && (
              <>
                <button type="button" onClick={() => setCurrentStep("bank-details")} className="text-blue-600 mb-4 flex items-center gap-1">
                  <RiArrowLeftLine /> Back
                </button>
                <div>
                  <label className="block text-sm font-semibold mb-2">Amount</label>
                  <input type="text" value={amount ? `$${formatCurrency(amount)}` : ""}
                    onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                    className="w-full px-4 py-3 border rounded-xl outline-none" />
                </div>
                <button type="submit" disabled={!amount} className="w-full bg-blue-600 text-white py-3 rounded-xl">
                  Continue to PIN
                </button>
              </>
            )}

            {currentStep === "pin-verification" && (
              <>
                <button type="button" onClick={() => setCurrentStep("amount")} className="text-blue-600 mb-4 flex items-center gap-1">
                  <RiArrowLeftLine /> Back
                </button>
                <div className="flex justify-center gap-3">
                  {pin.map((digit, i) => (
                    <input key={i}
                      ref={el => {
                        pinInputRefs.current[i] = el;
                      }}
                      type="password" maxLength={1} value={digit}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(i, e)}
                      className="w-12 h-12 text-xl text-center border rounded-lg" />
                  ))}
                </div>
                {pinError && <div className="text-red-600 text-center">{pinError}</div>}
                <button type="button" onClick={() => verifyPin(pin.join(""))}
                  disabled={pin.some(d => !d) || isProcessing}
                  className="w-full bg-green-600 text-white py-3 rounded-xl mt-4">
                  {isProcessing ? "Verifying..." : "Confirm"}
                </button>
              </>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === "confirmation" && (
              <div className="text-center">
                <div className="text-green-600 text-2xl mb-2">✔</div>
                <h3 className="text-xl font-bold">Transfer Successful!</h3>
                <p>You sent ${formatCurrency(amount)} to {selectedBank}</p>
                <button onClick={resetForm} className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6">
                  Make Another Transfer
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
