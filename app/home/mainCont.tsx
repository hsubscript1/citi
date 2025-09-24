import React from 'react';
import MainImg from '@/public/images/homepage.jpg';

const MainCont = () => {
  return (
    <div 
      style={{ 
        backgroundImage: `
          linear-gradient(
            to right,
            #1f466c 0%,
            #1f466c 45%,
            rgba(31, 70, 108, 0.8) 55%,
            rgba(31, 70, 108, 0.3) 65%,
            transparent 75%
          ),
          url(${MainImg.src})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }} 
      className='relative h-[50vh] md:h-[93vh]'
    >
      <div className='absolute top-[25%] md:top-[20%] left-0 w-full md:w-[60%] px-4 md:px-9'>
        <h1 className='text-3xl md:text-5xl font-medium text-white leading-tight'>
          Bank on Impact
        </h1>
        <p className='text-base md:text-lg pt-6 md:pt-8 font-medium text-white max-w-[600px]'>
          At Citi Bank, your deposits yield more than interest, they yield change. 
          Banking with us means financing a cleaner, better world.
        </p>
      </div>
    </div>
  );
};

export default MainCont;