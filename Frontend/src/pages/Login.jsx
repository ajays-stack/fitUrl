import React, { useState } from 'react'
import { useContext } from 'react';
import { urlcontext } from '../context/context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
    const {token,setToken}=useContext(urlcontext);
 const [currentState,setCurrentState]=useState('Sign Up');
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate();

 const onSubmitHandler=async (e)=>{

    e.preventDefault();
   console.log("hello")
    if(currentState=='Sign Up'){
        try{ 
            const response=await axios.post(import.meta.env.VITE_BACKEND_URL+'/user/register',{name,email,password});
            const restoken=response.data.token
            if(response.data.success){
                localStorage.setItem('token',restoken);
                setToken(restoken);
                toast.success("registered successfully")
                navigate('/')
            }
            else if(response.data.success==false && response.data.message=="User already registered"){
                    toast.error("user already registered");
                    console.log("already exist")
            }
            else{
                toast.error("user not created")
            }
        } 
        catch(error){
            console.log(error.message)
        }
    }
    if(currentState=='Login'){
         try{ 
            const response=await axios.post(import.meta.env.VITE_BACKEND_URL+'/user/login',{email,password});
            const restoken=response.data.token
            if(response.data.success){
                localStorage.setItem('token',restoken);
                setToken(restoken);
                toast.success("LoggedIn successfully")
                navigate('/')
            }
       
            else if(!response.data.success){
                toast.error(response.data.message);
            }
        } 
        catch(error){
            console.log(error.message)
        }
    }
   

 }

  return (
    <form onSubmit={onSubmitHandler} className=' text-white flex flex-col items-center  w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>

      {currentState==='Login'? '':<input onChange={(e)=>{setName(e.target.value)}} value={name} type='text' className='text-white w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input  onChange={ (e)=>{setEmail(e.target.value)}} value={email} type='email' className=' text-white w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type='password' className='text-white w-full px-3 py-2 border border-gray-800' placeholder='Password' required/> 
     <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer '>Forgot your Password</p>
      {
        currentState=='Login'
        ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
        :<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
      }
     </div>
     <button className='bg-black text-white font-light px-8 py-2 mt-4' type='submit'>{currentState=='Login'?'Login':'Sign Up'}</button>

    </form>
  )
}

export default Login

