import React, { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import dashboardLogo from '../../../../../src/assets/images/DashboardLogo.png';
import { AuthContext } from '../../../../Context/AuthContext';

export default function SideBar() {
  const [isCollapsable, setIsCollapsable] = useState(false);
  const toggleCollapse = () => setIsCollapsable(!isCollapsable);

  const { loginData } = useContext(AuthContext);
  const isAdmin = loginData?.userGroup === "SuperAdmin";

  const location = useLocation();

  // دالة تساعد نعرف إذا هذا الرابط هو النشط
  const isActive = (path) => {
    return location.pathname === path;
  };

  // كلاس لتطبيق على العنصر النشط
  const activeClass = "active-sidebar-item"; 

  return (
    <div className="position-sticky top-0 vh-100 sidebar-cont">
      <Sidebar collapsed={isCollapsable}>
        <Menu>
          <MenuItem onClick={toggleCollapse} className="my-5 sidebar-logo">
            <img
              src={dashboardLogo}
              alt=""
              className={`cursor-pointer ${isCollapsable ? "w-100" : "w-75"}`}
            />
          </MenuItem>

          {isAdmin ? (
            <>
              <MenuItem
                icon={<i className="fa fa-home"></i>}
                component={<Link to="/dashboard" />}
                className={isActive("/dashboard") ? activeClass : ""}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-users"></i>}
                component={<Link to="/dashboard/users" />}
                className={isActive("/dashboard/users") ? activeClass : ""}
              >
                Users
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-bowl-food"></i>}
                component={<Link to="/dashboard/recipes" />}
                className={isActive("/dashboard/recipes") ? activeClass : ""}
              >
                Recipes
              </MenuItem>
              <MenuItem
                icon={<i className="fas fa-utensils me-2"></i>}
                component={<Link to="/dashboard/categories" />}
                className={isActive("/dashboard/categories") ? activeClass : ""}
              >
                Categories
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-unlock-keyhole"></i>}
                component={<Link to="/dashboard/change-pass" />}
                className={isActive("/dashboard/change-pass") ? activeClass : ""}
              >
                Change Password
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
                component={<Link to="/dashboard/LogOut" />}
                className={isActive("/dashboard/LogOut") ? activeClass : ""}
              >
                LogOut
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                icon={<i className="fa fa-home"></i>}
                component={<Link to="/dashboard" />}
                className={isActive("/dashboard") ? activeClass : ""}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-bowl-food"></i>}
                component={<Link to="/dashboard/recipes" />}
                className={isActive("/dashboard/recipes") ? activeClass : ""}
              >
                Recipes
              </MenuItem>
              <MenuItem
                icon={<i className="fa-regular fa-heart"></i>}
                component={<Link to="/dashboard/fav" />}
                className={isActive("/dashboard/fav") ? activeClass : ""}
              >
                Favorites
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-unlock-keyhole"></i>}
                component={<Link to="/dashboard/change-pass" />}
                className={isActive("/dashboard/change-pass") ? activeClass : ""}
              >
                Change Password
              </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
                component={<Link to="/dashboard/LogOut" />}
                className={isActive("/dashboard/LogOut") ? activeClass : ""}
              >
                LogOut
              </MenuItem>
            </>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
}
