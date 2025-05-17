import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthenticationLayout() {
  return (
    <>
       <div className="auth-container">
            {/* تاخد 100 % من الشاشه مهما كان حجمها */}
            <div className="container-fluid bg-overlay">
                {/* row by defult flex  + by defult stretsh بالطول */}
                  <div className="row justify-content-center align-items-center vh-100">
                            <Outlet/>
                  </div>
            </div>
       </div>
    </>
  )
}
