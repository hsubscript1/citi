"use client";
import React, { useState } from "react";
import { RiFileCopy2Line } from "react-icons/ri";
import { TbHomeFilled } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { Banks } from "./data/bank";

interface Bank {
  NAME: string;
  STNAME: string;
  ADDRESS: string;
  ZIP: string;
}

const Transfer = () => {
  const [query, setQuery] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter banks by query
  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedBank("");

    if (value.trim() === "") {
      setBanks([]); // no search, wait for chevron
      return;
    }

    const filtered = Banks.filter((b) =>
      b.NAME.toLowerCase().startsWith(value.toLowerCase())
    );
    setBanks(filtered);
    setIsDropdownOpen(true);
  };

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
    setBanks([]);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    // Show all banks when dropdown is toggled
    if (!isDropdownOpen) {
      setBanks(Banks);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <form className="space-y-6">
        {/* Account Number */}
        <div>
          <label
            htmlFor="AccountNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Account Number
          </label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              id="AccountNumber"
              className="flex-grow px-3 py-2 outline-none"
              placeholder="Enter account number"
            />
            <button
              type="button"
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200"
            >
              <p className="text-sm">Paste</p>
              <RiFileCopy2Line />
            </button>
          </div>
        </div>

        {/* Bank Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Bank
          </label>
          <div className="relative">
            <div className="flex items-center border rounded-lg px-3">
              <TbHomeFilled className="text-gray-500 mr-2" />
              <input
                type="text"
                value={selectedBank || query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for a bank..."
                className="w-full py-2 outline-none"
              />
              <button
                type="button"
                onClick={toggleDropdown}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {isDropdownOpen && banks.length > 0 && !selectedBank && (
              <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-48 overflow-y-auto shadow">
                {banks.map((b, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleBankSelect(b.NAME)}
                  >
                    {b.NAME} ({b.STNAME})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
            <button type="button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
