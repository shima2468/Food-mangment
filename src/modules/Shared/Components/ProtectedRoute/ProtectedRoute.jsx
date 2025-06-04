import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';

export default function ProtectedRoute({children}) {
     let {loginData,saveLoginData}=useContext(AuthContext)
    if(localStorage.getItem('token')||loginData) return children;
    else return <Navigate to='/Log-in'/>;
}
 