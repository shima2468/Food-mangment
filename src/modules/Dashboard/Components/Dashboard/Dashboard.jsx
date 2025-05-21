import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/HeaderImg1.png'
export default function Dashboard({loginData}) {
  return (
    <>
       <Header titel={'welcom'} description={'This is a welcoming screen for the entry of the application, you can now see the options'} imgPath={headerImg} loginData={loginData}/>
       <div className="home-content mx-4 p-2 mt-4 ">
                  <div className="row d-flex align-items-center home-des">
                          <div className="col-md-8">
                                  <h3>Fill the Recipes !</h3>
                                  <p className='w-50'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                          </div>
                          <div className="col-md-4 d-flex justify-content-end">
                                  <button className='btn btn-success'>Fill Recipes <i class="fa-solid fa-arrow-right"></i></button>
                          </div>
                  </div>
       </div>
    </>
  )
}
