import React, { useContext } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import headerImg from '../../../../assets/images/HeaderImg1.png';
import { AuthContext } from '../../../../Context/AuthContext';

export default function Dashboard() {
  let { loginData, saveLoginData } = useContext(AuthContext);

  return (
    <>
      <Header
        titel={'welcom'}
        description={
          'This is a welcoming screen for the entry of the application, you can now see the options'
        }
        imgPath={headerImg}
        loginData={loginData}
      />

      <div className="home-content mx-4 p-2 mt-4">
        <div className="row align-items-center home-des gy-3 text-center text-md-start">
          <div className="col-12 col-md-8">
            <h3>Fill the Recipes !</h3>
            <p className="w-100 w-md-50 mx-auto mx-md-0">
              You can now fill the meals easily using the table and form. Click
              here and fill it with the table!
            </p>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
            <button className="btn btn-success">
              Fill Recipes <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
