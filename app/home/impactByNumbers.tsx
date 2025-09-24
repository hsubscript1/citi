import React from 'react'

const ImpactByNumbers = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl sm:text-5xl font-bold text-[#03305c] mb-4">
            Impact by the numbers
          </h1>
    
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-4  transition-all duration-300">
            <h1 className='text-[#e8742c] font-semibold text-4xl md:text-5xl mb-4'>101 Years</h1>
            <p className='text-[#03305c]'>of making a difference</p>
          </div>
          
            <div className="text-center p-4 transition-all duration-300">
            <h1 className='text-[#e8742c] font-semibold text-4xl md:text-5xl mb-4'>$8.3B</h1>
            <p className=' text-[#03305c] '>in assets</p>
          </div>
          
          <div className="text-center p-4 transition-all duration-300">
            <h1 className='text-[#e8742c] font-semibold text-4xl md:text-5xl mb-4'>100%</h1>
            <p className='text-[#03305c] '>committed</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ImpactByNumbers;