import React from 'react'
import { Sidebar } from 'react-pro-sidebar'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData}) {
  return (
   <> 
     <div className="d-flex">
           <div className="">
                <SideBar/>
           </div>
           <div className="w-100">
               <Navbar loginData={loginData}/>
                {/* <Header/> */}
               <Outlet loginData={loginData}/>
           </div>
     </div>
     
   </>
  )
}
