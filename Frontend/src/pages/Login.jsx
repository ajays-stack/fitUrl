import React, { useState } from 'react'
import { useContext } from 'react';
import { urlcontext } from '../context/context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
    // Add this state at the top
const [showPassword, setShowPassword] = useState(false);
console.log("hello")

    const {token,setToken}=useContext(urlcontext);
 const [currentState,setCurrentState]=useState('Sign Up');
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate();

 const onSubmitHandler=async (e)=>{

    e.preventDefault();
  
    if(currentState=='Sign Up'){
        try{ 
            const response=await axios.post(import.meta.env.VITE_BACKEND_URL+'/user/register',{name,email,password});
            const restoken=response.data.token
            if(response.data.success==true){
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


   if (currentState === 'Login') {
  try {
   
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/user/login', {
      email,
      password
    });

    if (response.data.success) {
      const restoken = response.data.token; // only access if success
      localStorage.setItem('token', restoken);
      setToken(restoken);
      toast.success("Logged in successfully");
      navigate('/');
    } 

  } catch (error) {
    toast.error(error.response.data.message);
    
     // fallback in case of server/network error
  }
}


 }

  return (
    <form onSubmit={onSubmitHandler} className=' text-white flex flex-col items-center  w-[90%] sm:max-w-96 m-auto mt-14 gap-4 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
      </div>

      {currentState==='Login'? '':<input onChange={(e)=>{setName(e.target.value)}} value={name} type='text' className='text-white w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input  onChange={ (e)=>{setEmail(e.target.value)}} value={email} type='email' className=' text-white w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
<div className="relative w-full">
  <input
    onChange={(e) => setPassword(e.target.value)}
    value={password}
    type={showPassword ? 'text' : 'password'}
    className="text-white w-full px-3 py-2 border border-gray-800 pr-10 bg-transparent"
    placeholder="Password"
    required
  />
  <div
    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

     <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer '>Forgot your Password</p>
      {
        currentState=='Login'
        ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
        :<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
      }
     </div>
     <button className='bg-gray-700 rounded-xl  text-white font-light px-8 py-2 mt-4' type='submit'>{currentState=='Login'?'Login':'Sign Up'}</button>

    </form>
  )
}

export default Login

