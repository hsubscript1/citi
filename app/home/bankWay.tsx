import React from 'react'

const BankWay = () => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
                  <hr className="border-t-1  mx-auto" />

      <div className="mx-auto pt-7 flex flex-col justify-start">
        <div className="text-start mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#03305c] mb-6">
            Tools to help you bank your way
          </h1>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="pl-6 border-l-2 border-[#03305c] hover:shadow-lg transition-shadow
           duration-300">
            <h2 className="text-xl font-semibold text-[#e8742c] mb-3">
              Digital banking
            </h2>
            <p className="text-gray-600">
              Bank from anywhere at anytime with Online Banking, Digital Wallet, and Zelle®.
            </p>
          </div>
          
  <div className="pl-6  border-l-2 border-[#03305c] hover:shadow-lg transition-shadow
           duration-300">            <h2 className="text-xl font-semibold text-[#e8742c] mb-3">
              Live Customer Service
            </h2>
            <p className="text-gray-600">
              Call <span className="font-medium">800-662-0860</span> to talk to one of our real, human experts, who can help answer all your financial questions.
            </p>
          </div>
          
  <div className="pl-6  border-l-2 border-[#03305c] hover:shadow-lg transition-shadow
           duration-300">            <h2 className="text-xl font-semibold text-[#e8742c] mb-3">
              Find a location near you
            </h2>
            <p className="text-gray-600">
              Come see us if you need to use an ATM or want to open an account in person.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BankWay;