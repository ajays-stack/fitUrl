import React from 'react'
import { SiSimpleanalytics } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa6";

const Description = () => {
  return (
    <div className='flex flex-col items-center gap-20 w-full md:flex-row  md:justify-around my-30'>
      <div className='transition-transform duration-[0.5s] ease-in-out transform hover:scale-[1.05] border flex border-gray-800 w-[80%] text-gray-200 md:w-[280px] h-[230px]  text-center flex-col justify-center rounded-2xl items-center bg-gray-600'>
        <SiSimpleanalytics className='h-[60px] w-[60px]' />
        <h1>Analytics</h1>
        <p>Trach clicks and monitor</p>
        <p>your link performance</p>

      </div>
       <div className=' transition-transform duration-[0.5s] ease-in-out transform hover:scale-[1.05] border flex border-gray-800 w-[80%] text-gray-200 md:w-[280px] h-[230px]  text-center flex-col justify-center rounded-2xl items-center bg-gray-600'>
        <RiSecurePaymentLine  className='h-[60px] w-[60px]'/>
        <h1>Secure</h1>
        <p>All links are secured and</p>
        <p>protected</p>


      </div>
      <div className='transition-transform duration-[0.5s] ease-in-out transform hover:scale-[1.05] border flex border-gray-800 w-[80%] text-gray-200 md:w-[280px] h-[230px]  text-center flex-col justify-center rounded-2xl items-center bg-gray-600'>
       <FaRegClock className='h-[60px] w-[60px]' />
       <p>Lightning-fast URL</p>
       <p>shortening and redirects</p>


      </div>
    </div>
  )
}

export default Description
