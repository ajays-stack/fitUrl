import React from "react";
import { FaLink } from "react-icons/fa";

import { IoMdMenu } from "react-icons/io";

const Header = () => {
   
  return (
    <div className=" flex justify-center flex-col items-center w-full gap-4 py-15">
      <h1 className="flex items-center justify-center gap-4">
        <FaLink className="inline h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
        <span className="text-3xl md:text-5xl pb-4">FIT-URL</span>
      </h1>
      <div className="flex w-full items-center justify-center relative">

        <p className="text-gray-200 text-xs sm:text-sm md:text-2xl">
          Transform your long URLs into short, shareable links in seconds
        </p>
   
     
        
   
      </div>
      <hr className="border-t-2 border-dashed border-white my-4 w-full" />
    </div>
  );
};

export default Header;
