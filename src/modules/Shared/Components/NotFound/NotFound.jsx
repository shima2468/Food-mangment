import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/NotFoundLogo .png";
import NotFoundImg from "../../../../assets/images/NotFoundImg.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0 d-flex flex-column flex-md-row vh-100 bg-white">
      <div className="col-md-5 d-flex flex-column justify-content-start px-4 py-4 ">
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-50" />
        </div>

        <div className="d-flex flex-column justify-content-center flex-grow-1 ps-md-4">
          <h2 className="fw-bold mb-2">Oops...</h2>
          <h5 className="text-muted mb-3">Page not found</h5>
          <p className="text-secondary mb-4">
            This page doesn’t exist or was removed. 
            We suggest <br /> you go back to home.
          </p>

          <button className="btn btn-success" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left me-2"></i> Back To Home
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-md-7 d-none d-md-block">
        <img
          src={NotFoundImg}
          alt="404 Not Found"
          className="img-fluid  w-100 h-100 object-fit-cover"
        />
      </div>
    </div>
  );
}
