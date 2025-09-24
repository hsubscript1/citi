import React from 'react';
import { GoDotFill } from "react-icons/go";
import Image from 'next/image';
import google from '@/public/images/google play.png';
import apple from '@/public/images/apple.png';
import molo from '@/public/images/molo-call.jpg';

const SecureBank = () => {
  const features = [
    'Deposit checks',
    'Schedule bill payments',
    'Transfer money between your accounts',
    'Find ATM and branch locations',
    'View account balances and transactions',
    'Easily send and receive transfers with Zelle®'
  ];

  return (
    <div className='px-4 sm:px-6 py-8'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center flex-col text-center mb-8 md:mb-12">
          <h1 className="text-[#03305c] text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Secure banking wherever you go
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl px-2">
            Manage your finances anytime, anywhere with our award-winning banking app
          </p>
        </div>

        <main className='flex flex-col-reverse md:flex-col lg:flex-row justify-between items-center gap-8 md:gap-12'>
          <div className='w-full max-w-xl order-2 lg:order-1'>
            <h2 className='text-xl sm:text-2xl font-semibold text-[#03305c] mb-4 md:mb-6'>
              Manage your accounts on the go with Citi Bank's app
            </h2>
            
            <ul className='space-y-2 sm:space-y-3 mb-6 md:mb-8'>
              {features.map((feature, index) => (
                <li key={index} className='flex items-start gap-2 sm:gap-3'>
                  <GoDotFill className='text-[#e8742c] text-base sm:text-lg mt-1 flex-shrink-0' />
                  <span className='text-gray-700 text-base sm:text-lg'>{feature}</span>
                </li>
              ))}
            </ul>

            {/* <div className='mb-6 text-gray-600 text-base sm:text-lg max-w-full md:max-w-[29rem] px-0 sm:px-4 md:px-7'>
              The app is available to download for Apple® and Android™ devices on the App Store® and Google Play™.
            </div>

            <div className='flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#" className='transition-transform hover:scale-105'>
                <Image 
                  src={google} 
                  alt='Download on Google Play' 
                  className='h-10 sm:h-12 w-auto'
                  priority
                />
              </a>
              <a href="#" className='transition-transform hover:scale-105'>
                <Image 
                  src={apple} 
                  alt='Download on App Store' 
                  className='h-10 sm:h-12 w-auto'
                  priority
                />
              </a>
            </div> */}
          </div>

          <div className='w-full flex justify-center mb-6 md:mb-0 order-1 lg:order-2'>
            <div className='relative w-full overflow-hidden shadow-lg'>
              <Image 
                src={molo} 
                alt='Mobile banking app screenshot' 
                className='w-full h-auto sm:h-[32rem] object-cover'
                priority
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SecureBank;
