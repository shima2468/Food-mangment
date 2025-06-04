import React, { useContext } from 'react'
import profilePhoto from "../../../../assets/images/profile.png"
import { AuthContext } from '../../../../Context/AuthContext'
export default function Navbar() {
  let {loginData,saveLoginData}=useContext(AuthContext)
  return (
    <>
   <nav className="navbar navbar-expand-lg">
  <div className="container-fluid navbar-bg mx-4 p-2">
   
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex ">
        <li className="nav-item d-flex justify-content-center">
           <img src={profilePhoto} alt="profile-photo" />
            <a class="nav-link active" aria-current="page" href="#">{loginData?.userName}</a>
        </li>
        <li className="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa fa-chevron-down"></i>
          </a>
          <ul className="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item d-flex justify-content-center align-items-center">
             <i class="fa fa-bell" ></i>
        </li>
      </ul>
     
    </div>
  </div>
</nav>
    </>
  )
}
