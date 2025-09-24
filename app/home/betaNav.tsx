'use client';
import React, { useEffect, useState } from 'react'

const BetaNav = () => {
      const [isMobile, setIsMobile] = useState(false);
      const [menubar, setMenubar] = useState(false);
      const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    
      const menuItems = [
        {
          title: 'Personal',
          links: ['Banking', 'Loans', 'Credit Cards', 'Investments']
        },
        {
          title: 'Small Business',
          links: ['Business Banking', 'Business Loans', 'Merchant Services']
        },
 
        {
          title: 'Institutional Investing',
          links: ['Wealth Management', 'Retirement Planning', 'Trust Services']
        },
        {
          title: 'About Us',
          links: ['Our Story', 'Leadership', 'Careers', 'Community Impact']
        }
      ];
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
          if (window.innerWidth > 768) {
            setMenubar(false);
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
      };
    
  return (
          <div className="w-full hidden md:block">
            <div className="flex justify-center items-center px-6 pb-2  max-w-7xl mx-auto">
              <ul className="flex space-x-8">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className='relative group'
                    onMouseEnter={() => !isMobile && setActiveDropdown(index)}
                    onMouseLeave={() => !isMobile && setActiveDropdown(null)}
                  >
                    <button
                      className='font-bold text-xl hover:text-[#e8742c] text-[#03305c] flex items-center space-x-1 py-2'
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{item.title}</span>
                    </button>

                    {activeDropdown === index && (
                      <div className='absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-100'>
                        <div className='py-1'>
                          {item.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href="#"
                              className='block px-4 py-2 text-sm text-[#03305c] hover:bg-[#f5f5f5] hover:text-[#e8742c]'
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )
}

export default BetaNav;