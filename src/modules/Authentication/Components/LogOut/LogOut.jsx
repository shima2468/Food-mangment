import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LogOut() {
  let navigate=useNavigate()
  useEffect(() => {
    localStorage.removeItem('token');
    navigate("/Log-in")
    toast.success("Logged out successfully!")
  }, [])
  
  return (
         <></>
  )
}
