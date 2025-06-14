import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import { EMAIL_VALIDATION } from "../../../../Services/vaildition";
import { PASSWORD_VALIDATION } from "../../../../Services/vaildition";

export default function Register() {
  let Navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger
  } = useForm({mode:"onChange"});
  const password = watch("password");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =useState(false);

   const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const onSubmit = async (data) => {
    const UserData = appendToFormData(data);
    try {
      let response = await axiosInstance.post(USERS_URLS.REGESTER_USER, UserData);
      console.log(response);

      toast.success("تم تسجيل الدخول بنجاح ✅");
      setTimeout(() => {
        Navigate("/verify-account");
      }, 2000); // عشان المستخدم يشوف التنبيه
    } catch (error) {
      toast.error("فشل تسجيل الدخول ❌");
      console.log(error);
    }
  };

    useEffect(()=>{
    if(watch("confirmPassword")){
                   trigger("confirmPassword")  //تقوم بتشغيل الـ validation يدويًا على حقل معيّن
    }
   
    },[watch("password"),watch("confirmPassword")]) 
  return (
    <div className="col-md-7 bg-light px-5 py-5 rounded-3">
      <div className="">
        <div className="logo-container text-center">
          <img className="w-25" src={logo} alt="food-logo" />
        </div>
        <div className="title">
          <h4>Register</h4>
          <p className="text-muted">Welcome Back! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="d-flex gap-5">
            <div className="input-group mb-3 w-50">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-user"></i>
              </span>
              <input
                {...register("userName", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_]{4,20}$/,
                    message: "userName not valid , please enter valid userName",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="userName"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 w-50">
              <span class="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                {...register("email", EMAIL_VALIDATION)}
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="d-flex gap-5">
            <div className="w-50">
              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}
            </div>
            <div className="w-50">
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-5">
            <div className="input-group mb-3 w-50">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-earth-americas"></i>
              </span>
              <input
                {...register("country", {
                  required: "field is required",
                  pattern: {
                    value: /^[A-Za-z\s]{2,40}$/,
                    message:
                      "Country name must contain only letters and spaces, and be between 2 to 40 characters",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="country"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="input-group mb-3 w-50">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-mobile-screen"></i>
              </span>
              <input
                {...register("phoneNumber", {
                  required: "field is required",
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message:
                      "Phone number must start with 010, 011, 012, or 015 and contain exactly 11 digits",
                  },
                })}
                type="phone"
                className="form-control"
                placeholder="phone"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="d-flex gap-5">
            <div className="w-50">
              {errors.country && (
                <span className="text-danger">{errors.country.message}</span>
              )}
            </div>
            <div className="w-50">
              {errors.email && (
                <span className="text-danger">{errors.phoneNumber.message}</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-5">
            <div className="input-group mb-3 w-50">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                {...register("password", PASSWORD_VALIDATION)}
                type={isNewPasswordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Password"
              />
              <button
                type="button"
                className="input-group-text"
                onClick={() => setIsNewPasswordVisible((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <i
                  className={`fa-solid ${
                    isNewPasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </button>
            </div>

            <div className="input-group mb-3 w-50">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="input-group-text"
                onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <i
                  className={`fa-solid ${
                    isConfirmPasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <div className="d-flex gap-5">
            <div className="w-50">
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="w-50">
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="Links d-flex justify-content-end ">
            <Link to="/Log-in" className="text-decoration-none text-success">
              Login Now?
            </Link>
          </div>
          <div className="d-flex justify-content-center pt-4">
            <button className="btn btn-success w-50">Register</button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
