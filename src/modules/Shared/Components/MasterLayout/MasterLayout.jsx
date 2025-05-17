import React from 'react'
import { Sidebar } from 'react-pro-sidebar'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
   <> 
     <div className="d-flex">
           <div className="w-25 bg-info">
                <SideBar/>
           </div>
           <div className="w-75 bg-warning">
               <Navbar/>
               <Header/>
               <Outlet/>
           </div>
     </div>
     
   </>
  )
}
