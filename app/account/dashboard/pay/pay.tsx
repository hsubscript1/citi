"use client";
import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

export interface PayProps {
  provider: string;
  customerName: string;
  reference: string; // instead of meter number
  billType: string;  // new
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid";
  onPay: () => void;
}

const Pay: React.FC<PayProps> = ({
  provider,
  customerName,
  reference,
  billType,
  amount,
  dueDate,
  status,
  onPay,
}) => {
  const isOverdue = new Date(dueDate) < new Date() && status === "unpaid";

  const shareWhatsApp = () => {
    const message = encodeURIComponent(`Here is my ${billType} receipt 📄`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const shareTwitter = () => {
    const message = encodeURIComponent(`Paid my ${billType} ✅ #Receipt`);
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(`My ${billType} Receipt`);
    const body = encodeURIComponent(`Here’s my ${billType} receipt.`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Pay {billType}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Powered by <span className="font-medium">{provider}</span>
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase shadow-sm self-start ${
                status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-700 animate-pulse"
              }`}
            >
              {status}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500 font-medium">Customer</span>
              <span className="text-gray-900 font-semibold">{customerName}</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500 font-medium">Reference</span>
              <span className="text-gray-900 font-mono">{reference}</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500 font-medium">Due Date</span>
              <span className={`font-semibold ${isOverdue ? "text-red-600" : "text-gray-900"}`}>
                {dueDate}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-gray-500 font-medium">Amount Due</span>
              <span className="text-3xl font-bold text-blue-700">${amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Actions */}
          {status === "unpaid" && (
            <button
              onClick={onPay}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
            >
              Pay Now
            </button>
          )}

          {status === "paid" && (
            <div className="text-center py-6 bg-green-50 rounded-xl">
              <div className="text-green-600 font-semibold flex items-center justify-center">
                ✅ Payment Successful
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Your {billType} payment was successful 🎉
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share */}
      <div className="w-full max-w-2xl mt-6 flex gap-3 justify-center">
        <button onClick={shareWhatsApp} className="p-2 bg-green-500 text-white rounded-lg">
          <FaWhatsapp size={18} />
        </button>
        <button onClick={shareTwitter} className="p-2 bg-blue-400 text-white rounded-lg">
          <FaXTwitter size={18} />
        </button>
        <button onClick={shareFacebook} className="p-2 bg-blue-600 text-white rounded-lg">
          <FaFacebookF size={18} />
        </button>
        <button onClick={shareEmail} className="p-2 bg-gray-700 text-white rounded-lg">
          <IoMailOutline size={18} />
        </button>
      </div>
    </>
  );
};

export default Pay;
