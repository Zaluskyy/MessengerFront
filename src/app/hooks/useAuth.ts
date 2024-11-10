"use client"

import React, { useContext, useEffect, useState } from 'react'
import MessageContext from '../context/context';
import { useRouter } from 'next/navigation';

interface IUseAuth {
  register?: boolean;
  redirect?: boolean;
}

const useAuth = ({ register, redirect = true }: IUseAuth = {}) => { 


  const messageContext = useContext(MessageContext);
  const {
    apiUrl,
    setLogged,
    setUserId,
    setUserName,
    setFriends,
  } = messageContext;

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/check-auth`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setLogged(data.isAuthenticated);
          setUserId(data.id);
          setUserName(data.name);
          setFriends(data.friendlist);
          if(redirect){
            router.push("/friends");
          }
        } else {
          if(register){
              router.push("/register")
          }
          else{
              router.push("/login");
          } 
        }
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    };
    checkAuth();
  }, []);

  return {loading}

}
 
export default useAuth;