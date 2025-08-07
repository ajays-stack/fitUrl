import React from 'react';
import { use } from 'react';
import { useNavigate } from 'react-router';
const Imagetourl = () => {
  const navigate=useNavigate();
  return (
    <div>
      <div className='border rounded h-15 w-100 flex justify-center items-center gap-7 '>
        <span className='text-xl  font-medium'>Image to URL</span>
        <button
          className=" glowing-button button text-transparent bg-clip-text bg-blue-600 text-white text-sm px-4 py-1.5 w-30 "
          onClick={()=>{navigate('/image')}}
        >
          Click Here
        </button>
      </div>
    </div>
  );
};

export default Imagetourl;
