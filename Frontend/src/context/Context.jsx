import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const urlcontext=createContext({});


const Context=({children})=>{
    const [search,setSearch]=useState(false);
    const [token,setToken]=useState("");
    useEffect(()=>{
const temp=localStorage.getItem('token')
setToken(temp);
    },[])


return (
    <urlcontext.Provider value={{search,setSearch,token,setToken}}>
    {children}
</urlcontext.Provider>
)

}
export default Context;