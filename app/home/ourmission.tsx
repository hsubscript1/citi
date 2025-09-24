'use client';
import React from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const OurMission = () => {
  const missions = [
    "Citi Bank Closes $1.7M Retroactive C-Pace Deal to Revitalize Nashville Retail Space",
    "Citi Financial Corporation Welcomes Steven S. SaLoutos and Tony Wells to its Board of Directors",
    "Citi Bank Advances Climate Leadership with C-PACE Financing for 205kW Solar Energy and Roofing Project in New Bedford",
    "Citi Bank Joins Nearly $1 Billion Aggregate Financing with Greenbacker's 674 MW Cider Solar Farm, Powering New York's Largest Solar Project to Date",
  ];

  return (
    <div className="max-w-7xl mx-auto px-7 pb-6">
      {" "}
      <div>
               <h1 className="text-3xl sm:text-4xl font-bold text-[#03305c]
                text-center mb-12">
Our Mission in Action</h1> 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {missions.map((item, index) => (
          <div key={index}>
            <div className="border-1 border-[#03305c]">
                   <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        // className="w-full h-full"
      >
            <Image src={logo} alt="logo"  />
            </motion.div>
            </div>
            <hr className="border-[#e8742c] font-semibold my-2" />
            <p className="text-[#03305c] hover:text-[#e8742c] font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
