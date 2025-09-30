"use client";
import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

export interface ElectricityPillProps {
  provider: string;
  customerName: string;
  meterNumber: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid";
  onPay: () => void;
}

const Electricity: React.FC<ElectricityPillProps> = ({
  provider,
  customerName,
  meterNumber,
  amount,
  dueDate,
  status,
  onPay,
}) => {
  const isOverdue = new Date(dueDate) < new Date() && status === "unpaid";

  // Share Functions
  const shareWhatsApp = () => {
    const message = encodeURIComponent("Here is my electricity receipt ⚡📄");
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const shareTwitter = () => {
    const message = encodeURIComponent("Paid my electricity bill ✅ #Receipt");
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent("My Electricity Receipt");
    const body = encodeURIComponent("Here’s my electricity receipt.");
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Electricity Bill
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Powered by <span className="font-medium">{provider}</span>
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase shadow-sm transition-all self-start ${
              status === "paid"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700 animate-pulse"
            }`}
          >
            {status}
          </div>
        </div>

        {/* Bill Details */}
        <div className="space-y-6 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between sm:items-center pb-4 border-b border-gray-200">
            <span className="text-gray-500 font-medium text-sm sm:text-base">
              Customer
            </span>
            <span className="text-gray-900 font-semibold text-base sm:text-lg">
              {customerName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between sm:items-center pb-4 border-b border-gray-200">
            <span className="text-gray-500 font-medium text-sm sm:text-base">
              Meter Number
            </span>
            <span className="text-gray-900 font-mono text-base sm:text-lg">
              {meterNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between sm:items-center pb-4 border-b border-gray-200">
            <span className="text-gray-500 font-medium text-sm sm:text-base">
              Due Date
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span
                className={`font-semibold text-base sm:text-lg ${
                  isOverdue ? "text-red-600" : "text-gray-900"
                }`}
              >
                {dueDate}
              </span>
              {isOverdue && (
                <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold self-start">
                  Overdue
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center pt-2">
            <span className="text-gray-500 font-medium text-sm sm:text-base">
              Amount Due
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-blue-700">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        {status === "unpaid" && (
          <button
            onClick={onPay}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg"
          >
            Pay Now
          </button>
        )}

        {status === "paid" && (
          <div className="text-center py-6 bg-green-50 rounded-xl">
            <div className="text-green-600 font-semibold flex items-center justify-center text-base sm:text-lg">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Payment Successful
            </div>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Thank you for your payment 🎉
            </p>
          </div>
        )}
      </div>

      {/* Sharing Buttons */}
     
    </div>
     <div className="w-full max-w-2xl mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={shareWhatsApp}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
<FaWhatsapp size={18} />
        </button>
        <button
          onClick={shareTwitter}
          className="px-4 py-2 bg-blue-400 text-white rounded-lg"
        >
<FaXTwitter size={18}  />
        </button>
        <button
          onClick={shareFacebook}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
<FaFacebookF size={18}  />
        </button>
        <button
          onClick={shareEmail}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
<IoMailOutline size={18} />
        </button>
      </div>
      </>
  );
};

export default Electricity;
