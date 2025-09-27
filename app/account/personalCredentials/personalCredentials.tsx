"use client";
import { usePersonalStore } from "@/app/store/usePersonalStore";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const PersonalCredentials = () => {
  const router = useRouter();
  const { birthday, gender, pinValue, setBirthday, setGender, addPinDigit, clearPin, backspacePin, signupData } = usePersonalStore();
  const [loading, setLoading] = useState(false);

  const handleFinalSignup = async () => {
    if (!signupData) {
      toast.error("Missing signup data. Please start again.");
      router.push("/account/signup");
      return;
    }
    if (!birthday || !gender || pinValue.length !== 4) {
      toast.error("Please complete all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signupData,
          birthday,
          gender,
          pin: pinValue.join(""),
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || "Signup failed");
      } else {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => router.push("/account/login"), 2000);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFinalSignup();
        }}
        className="w-full max-w-md bg-white shadow-md rounded-md p-6 space-y-5"
      >

        <div className="space-y-2">
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your birthday
          </label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#03305c] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Select your Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#03305c] focus:outline-none"
          >
            <option value="">-- Choose one --</option>
            {["Male", "Female", "Rather Not Say"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Create 4-digit Transaction PIN
          </label>

          <div
            className="flex justify-between px-4 py-2 text-xl font-bold tracking-widest
           bg-gray-100 rounded-lg"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="w-5 text-center">
                {pinValue[i] ?? "_"}
              </span>
            ))}
          </div>

          <ul className="grid grid-cols-3 gap-4 mt-4 text-lg font-semibold">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <li
                key={num}
                onClick={() => addPinDigit(num)}
                className="flex justify-center items-center h-12 bg-indigo-100 
                rounded-xl cursor-pointer hover:bg-indigo-200 transition"
              >
                {num}
              </li>
            ))}

            <li
              onClick={backspacePin}
              className="flex justify-center items-center h-12 bg-red-100 
              rounded-xl cursor-pointer hover:bg-red-200 transition col-span-1"
            >
<MdOutlineCancel size={18} />
            </li>

            <li
              onClick={clearPin}
              className="flex justify-center items-center h-12 bg-gray-200 
              rounded-xl cursor-pointer hover:bg-gray-300 transition col-span-2"
            >
              Clear
            </li>
          </ul>
        </div>
      <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#03305c] text-white py-3 rounded-md"
        >
          {loading ? "Signing Up..." : "Finish Signup"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PersonalCredentials;
  
