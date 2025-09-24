import React from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { ProductCardProps } from './type';



const ProductCard: React.FC<ProductCardProps> = ({ 
  tag, 
  title, 
  description, 
  primaryButtonText, 
  highlightValue, 
  highlightDescription, 
  features,
  secondaryActionText
}) => {
  return (
    <section className='relative bg-white border border-[#03305c] 
    p-6 max-w-2xl mx-auto shadow-lg h-full'>
      <h1 className='bg-[#03305c] text-white py-1 px-4 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm font-medium'>
        {tag}
      </h1>

      <div className='mt-4'>
        <h1 className='text-3xl font-bold text-[#03305c] mb-3'>{title}</h1>
        <p className='text-gray-700 mb-6 text-sm font-medium'>{description}</p>

        <div className='flex justify-between gap-4 mb-6'>
          <button className='bg-[#e8742c] hover:bg-[#d16624] text-white
           py-2 px-3 
          rounded-3xl font-medium transition-colors text-sm'>
            {primaryButtonText}
          </button>
          <div className='text-[#03305c] font-medium flex items-center gap-1 cursor-pointer hover:underline'>
            Learn More <FaLongArrowAltRight className="ml-1" />
          </div>
        </div>

        <hr className='border-[#03305c] opacity-30 my-4' />

        <div>
          <h1 className='text-[#03305c] font-bold text-3xl mb-4'>{highlightValue} </h1>
          {highlightDescription && <h3>{highlightDescription}</h3>}
          <ul className='space-y-2'>
            {features.map((item, index) => (
              <li key={index} className='flex items-start gap-2 font-semibold'>
                <CiCircleCheck className='text-[#e8742c] text-xl mt-0.5 flex-shrink-0' />
                <span className='text-gray-700'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {secondaryActionText && (
        <p className='text-[#e8742c] hover:underline mt-2'>{secondaryActionText}</p>
      )}
    </section>
  );
};

interface Product {
  tag: string;
  title: string;
  description: string;
  primaryButtonText: string;
  highlightValue: string;
  highlightDescription?: string;
  features: string[];
  secondaryActionText?: string;
}

const YourMoney: React.FC = () => {
  const products: Product[] = [
    {
      tag: "Personal",
      title: "7-Month Certificate of Deposit",
      description: "Accelerate your growth and gain peace of mind with an investment you can count on. Once your CD is opened, your interest rate within your chosen term is guaranteed.1,2",
      primaryButtonText: "Apply now",
      highlightValue: "4.03% APY*",
      features: [
        '$500 deposit to open account',
        'FDIC insured3',
        'Guaranteed rate'
      ]
    },
    {
      tag: "Personal",
      title: "Online Checking",
      description: "A powerful, interest-bearing checking account1 that can be opened online in minutes, giving you the convenience and flexibility you need every day.",
      primaryButtonText: "Apply now",
      highlightValue: "$0",
      highlightDescription: "Monthly maintenance fee",
      features: [
        '$100 minimum opening deposit',
        'Earns interest',
        'Includes check writing'
      ],
      secondaryActionText: "See Rates"
    },
    {
      tag: "Small Business",
      title: "Citi Business Checking Plus",
      description: "A flexible account for growing businesses and organizations with transaction volume and cash management needs.",
      primaryButtonText: "Email Us",
      highlightValue: "$0",
      highlightDescription: "Minimum opening deposit",
      features: [
        '$20 monthly service fee4',
        '250 transactions included5',
        'Includes Treasury Management'
      ]
    },
    {
      tag: "Commercial",
      title: "Hard Working Money Market Account",
      description: "Earn more on your commercial savings with a tiered interest rate that rewards higher balances.",
      primaryButtonText: "Email Us",
      highlightValue: "$1,000",
      highlightDescription: "Minimum initial deposit",
      features: [
        'Higher interest on higher balances',
        'No monthly fee with $1,000 or higher average daily balance',
        'Unlimited in-person deposits and withdrawals6'
      ]
    }
  ];

  return (
    <>
      <div className='flex justify-center pt-7 items-center flex-col text-center mx-auto px-4 md:px-9'>
        <h1 className='text-[#03305c] text-4xl font-semibold mb-4'>
          Put your money where your values are
        </h1>
        <p className='text-[#4b4b4b] font-medium'>
          Discover financial products that align your personal or business growth with collective growth for our communities and our planet.
        </p>
      </div>
      
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 max-w-7xl mx-auto'>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </main>
    </>
  );
};

export default YourMoney;