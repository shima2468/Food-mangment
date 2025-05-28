import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({loginData,children}) {
    if(localStorage.getItem('token')||loginData) return children;
    // بتستخدم في الكلاس كمبوننت مش فالفنكشن كمبوننت 
    else return <Navigate to='/Log-in'/>;
}
 