import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem , SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import dashboardLogo from '../../../../../src/assets/images/DashboardLogo.png'
export default function SideBar() {
   const [isCollapsable, setIsCollapsable] = useState(false);
   let ToggelCollapse=()=>{
       setIsCollapsable(!isCollapsable)
   }
  return (
    <>
   <div className=" position-sticky top-0  vh-100  sidebar-cont">

          <Sidebar collapsed={isCollapsable}>
               <Menu>
                  <MenuItem onClick={ToggelCollapse} className='my-5 sidebar-logo'>
                  <img src={dashboardLogo} alt="" className={`cursor-pointer ${isCollapsable? "w-100":"w-75"}`}/>
                  </MenuItem>
                  <MenuItem icon={<i className=' fa fa-home'></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
                  <MenuItem icon={<i className=' fa fa-users'></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
                  <MenuItem  icon={<i class="fa-solid fa-bowl-food"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
                  <MenuItem  icon={<i className="fas fa-utensils me-2"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
                  <MenuItem  icon={<i class="fa-solid fa-unlock-keyhole"></i>}> change password </MenuItem>
                  <MenuItem  icon={<i class="fa-solid fa-right-from-bracket"></i>} component={<Link to="/dashboard/LogOut" />}> LogOut </MenuItem>
              </Menu>
         </Sidebar>
    </div>

    </>
  )
}
