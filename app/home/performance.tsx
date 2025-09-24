import React from 'react';
import smiling from '@/public/images/working-girlie.jpg';
import bush from '@/public/images/push-shii.jpg';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Image from 'next/image';

const Performance = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#03305c] text-center mb-12">
          Where mission meets performance
        </h1>

        <section className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="relative group flex-1">
            <div className="relative h-[25rem] w-full overflow-hidden">
              <Image
                src={smiling}
                alt="Happy team working"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03305c]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Our mission</h1>
                <p className="mb-4 max-w-md">
                  Our mission is to be America's socially responsible bank, empowering individuals and organizations to drive positive social change.
                </p>
                <div className="text-[#e8742c] font-medium flex items-center gap-1 cursor-pointer hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <FaLongArrowAltRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group flex-1">
            <div className="relative h-[25rem] w-full overflow-hidden">
              <Image
                src={bush}
                alt="Team achieving goals"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03305c]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Our performance</h1>
                <p className="mb-4 max-w-md">
                  We measure success by both financial returns and social impact, creating sustainable value for all stakeholders.
                </p>
                <div className="text-[#e8742c] font-medium flex items-center gap-1 cursor-pointer hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <FaLongArrowAltRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Performance;
