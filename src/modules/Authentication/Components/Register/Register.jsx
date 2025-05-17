import React from 'react'
import logo from "../../../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function Register() {
   let Navigate=useNavigate();
   let { register, formState: { errors }, handleSubmit, watch } = useForm();
   const password = watch('password');
  const onSubmit =async(data)=>{
       console.log(data);
      //  api integration
    try {
    let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register", data);
    console.log(response);

    toast.success('تم تسجيل الدخول بنجاح ✅');
    setTimeout(() => {
      Navigate('/dashboard');
    }, 2000); // عشان المستخدم يشوف التنبيه
  } catch (error){
          toast.error('فشل تسجيل الدخول ❌');
          console.log(error)
      }
  }
  return (
      <div className="col-md-7 bg-light px-5 py-5 rounded-3">
                <div className="">
                      <div className="logo-container text-center">
                              <img className='w-25' src={logo} alt="food-logo" />
                      </div>
                      <div className="title">
                          <h4 >Register</h4>
                          <p className='text-muted'>Welcome Back! Please enter your details</p>
                      </div>
                     
                      <form onSubmit={handleSubmit(onSubmit)} className=''>
                                <div className="d-flex gap-5">
                                      <div className="input-group mb-3 w-50">
                                      <span class="input-group-text" id="basic-addon1">
                                          <i class="fa-solid fa-user"></i>
                                      </span>
                                      <input {...register('userName',{
                                         required:'field is required',
                                          pattern: {
                                              value:/^[a-zA-Z0-9_]{4,20}$/,
                                               message: 'userName not valid , please enter valid userName'
                                         }
                                      })}  type="text" className="form-control" placeholder="userName" aria-label="Username" aria-describedby="basic-addon1"/>
                                      </div>
                                      {errors.userName  && <span className="text-danger">{errors.userName.message}</span>}
                                      <div className="input-group mb-3 w-50">
                                      <span class="input-group-text" id="basic-addon1">
                                           <i className="fa-solid fa-envelope"></i>
                                      </span>
                                      <input {...register('email',{
                                         required:'field is required',
                                          pattern: {
                                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                               message: 'Email not valid , please enter valid email'
                                         }
                                      })}  type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                                      </div>
                                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                </div>
                                <div className="d-flex gap-5">
                                      <div className="input-group mb-3 w-50">
                                      <span class="input-group-text" id="basic-addon1">
                                          <i class="fa-solid fa-earth-americas"></i>
                                      </span>
                                      <input {...register('country',{
                                         required:'field is required',
                                          pattern: {
                                              value:/^[A-Za-z\s]{2,40}$/,
                                              message: "Country name must contain only letters and spaces, and be between 2 to 40 characters"
                                         }
                                      })}  type="text" className="form-control" placeholder="country" aria-label="Username" aria-describedby="basic-addon1"/>
                                      </div>
                                      {errors.country  && <span className="text-danger">{errors.country.message}</span>}
                                      <div className="input-group mb-3 w-50">
                                      <span class="input-group-text" id="basic-addon1">
                                           <i class="fa-solid fa-mobile-screen"></i>
                                      </span>
                                      <input {...register('phoneNumber',{
                                         required:'field is required',
                                         pattern: {
                                               value: /^01[0125][0-9]{8}$/,
                                               message: "Phone number must start with 010, 011, 012, or 015 and contain exactly 11 digits"
                                         }
                                      })}  type="phone" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                                      </div>
                                      
                                </div>
                                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                 
                                
                                <div className="d-flex gap-5">
                                          <div className="input-group mb-3 w-50">
                                      <span className="input-group-text" id="basic-addon1">
                                        <i className="fa-solid fa-lock"></i>
                                      </span>
                                      <input
                                        {...register('password', {
                                          required: 'password is required',
                                          pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                            message:
                                              'Password must be at least 8 characters, include uppercase, lowercase, number, and special character',
                                          },
                                        })}
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                      />
                                          </div>
                                          {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                           <div className="input-group mb-3 w-50">
                                      <span className="input-group-text" id="basic-addon1">
                                        <i className="fa-solid fa-lock"></i>
                                      </span>
                                      <input
                                        {...register('confirmPassword', {
                                          required: 'confirm password is required',
                                          validate: (value) =>
                                            value === password || 'Passwords do not match',
                                        })}
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                      />
                                           </div>
                                    
                                </div>
                                {errors.confirmPassword && (
                                      <span className="text-danger">{errors.confirmPassword.message}</span>
                                    )}
                             

                                   
      
                                
                                 <div className="d-flex justify-content-center pt-4">
                                           <button className="btn btn-success w-50">Reset Password</button>
                                 </div>
                                 <ToastContainer />
                      </form>
      
                </div>
      
           </div>
  )
}
