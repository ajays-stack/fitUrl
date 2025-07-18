import React from 'react'
import { BsArrowsAngleContract } from "react-icons/bs";
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { urlcontext } from '../context/Context';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const Search = () => {
  const [url,setUrl]=useState("");
  const {search,setSearch,token,setToken}=useContext(urlcontext)
  const navigate=useNavigate()

const submitHandler=async(e)=>{
  e.preventDefault();
  if(!token){
navigate('/login');
  }
  else{ try{
    const response=await axios.post(import.meta.env.VITE_BACKEND_URL+'/url/short',{url},{ headers: {
            Authorization: `Bearer ${token}`
          }});
    if(response.data.success==true){
      setSearch(!search);
        setUrl("")
        window.scrollBy({
  top: 1200,             // number of pixels to scroll down
  behavior: 'smooth'    // for smooth scrolling animation
});

    }
    if(response.data.success=="alreadypresent"){
      toast.error("already present")
    }
  }
catch(error){
  console.log(error);
  toast.error("search error in search.jsx")


}}
 

}



  return (
    <div className='  my-1 flex items-center justify-center flex-col border rounded-2xl  h-[150px] w-[300px] md:h-[300px] md:w-[500px] px-[50px] gap-5 overflow-hidden'>
       <div className='flex items-center flex-col justify-start h-[40%] px-0'> 
        <h1 className='text-lg md:text-3xl '>Shorten Your URL</h1>
        <p className='text-[8px] md:text-[15px] w-full'>Enter a long URL below to get a shortened version</p>
        </div>
        <form onSubmit={(e)=>{submitHandler(e)}}className='w-full flex gap-4 flex-col justify-center items-center py-4 md:flex-row'>
            <input className='w-full md:w-[70%] h-[20px]  md:h-[40px] border px-4 rounded-xl overflow-hidden' type="text" name="url" placeholder='http://google.com' value={url} onChange={(e)=>{setUrl(e.target.value)}}></input>
           <button  type="submit" className='  w-[100px] h-[20px] md:h-[40px] md:w-[30%]  text-sm md:text-xl rounded-xl border border-dashed border-gray-200'><BsArrowsAngleContract className='inline-block h-[15px]' /> <span className='ml-2'>Submit</span></button>
        </form>
      
    </div>
  )
}

export default Search
