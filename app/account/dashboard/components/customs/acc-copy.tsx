'use client';
import React, { useState } from "react";
import { IoCopy, IoCheckmarkDone } from "react-icons/io5";
import CustomerSupport from "./customerSupport";

interface CopyAccountProps {
  accountNumber?: number | string; // ✅ make optional
  currency: string;
}

const CopyAccountNumber: React.FC<CopyAccountProps> = ({ accountNumber, currency }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!accountNumber) return;
    navigator.clipboard.writeText(accountNumber.toString());
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-2 flex items-center gap-2">
      <p className="text-sm text-gray-500">
        {`${currency} account-${accountNumber ?? <CustomerSupport />}`}
      </p>
      {accountNumber && (
        <button onClick={handleCopy} className="flex items-center justify-center">
          {copied ? (
            <IoCheckmarkDone size={10} color="pink" />
          ) : (
            <IoCopy size={10} color="green" />
          )}
        </button>
      )}
    </div>
  );
};

export default CopyAccountNumber;
