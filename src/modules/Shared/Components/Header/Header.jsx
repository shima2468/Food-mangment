import React, { useContext } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
export default function Header({titel,description,imgPath}) {
      let {loginData,saveLoginData}=useContext(AuthContext)
  return (
    <>
     <div className="container-fluid header-bg px-5 rounded-2">
              <div className="row ">
                    <div className="col-md-8 d-flex align-items-center text-white px-5">
                          <div>
                                  <h2 className='fs-2'>{titel} <span>{loginData?.userName}</span></h2>
                                  <p className='w-75'>{description}</p>
                          </div>
                       
                    </div>
                    <div className="col-md-4 d-flex justify-content-end px-5 ">
                          <img src={imgPath} alt="header-img" className=''/>
                    </div>
                  
              </div>        
         
     </div>
    </>
  )
}
