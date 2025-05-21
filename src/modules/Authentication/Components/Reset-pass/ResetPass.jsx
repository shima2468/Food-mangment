import React from 'react'
import logo from "../../../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function ResetPass() {
   let Navigate=useNavigate();
   let { register, formState: { errors }, handleSubmit, watch } = useForm();
   const password = watch('password');
  const onSubmit =async(data)=>{
       console.log(data);
      //  api integration
    try {
    let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data);
    console.log(response);

    toast.success('Password has been reset successfully ✅');
    setTimeout(() => {
      Navigate('/dashboard');
    }, 2000); // عشان المستخدم يشوف التنبيه
  } catch (error){
          toast.error('فشل تسجيل الدخول ❌');
          console.log(error)
      }
  }
  return (
       <div className="col-md-5 bg-light px-5 py-4 rounded-3">
                <div className="">
                      <div className="logo-container text-center">
                              <img className='w-25' src={logo} alt="food-logo" />
                      </div>
                      <div className="title">
                          <h4 > Reset  Password</h4>
                          <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                      </div>
                      {/* 3 بدي اربط الفورم */}
                      {/*  لما يسير الاون سبمت روح كول الهاندل سبمت  */}
                      {/* وروح ابعتلها الاون سبمت  */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                                 <div className="input-group mb-3">
                                      <span className="input-group-text" id="basic-addon1">
                                           <i className="fa-solid fa-envelope"></i>
                                      </span>
                                      {/* هنا بيحضر داتا للباك لانو الباك هو الي هياخد الداتا*/}
                                      {/* الميل هو الي هينبعت للباك */}
                                      {/*الي حكالي انو اسمها ايميل هو الريكوست بادي الي جاي من الباك */}
                                      <input {...register('email',{
                                         required:'field is required',
                                          pattern: {
                                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                               message: 'Email not valid , please enter valid email'
                                         }
                                      })}  type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                                 </div>
                                 {/* الايرورز من الرياكت هوك ولازم اعرفه لاي بروبرتي */}
                                 {/* بداخل السبان لازم احددله جمله الايرور الي هتطلع واي وجده فيهم*/}
                                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                 <div className="input-group mb-3">
                                      <span className="input-group-text" id="basic-addon1">
                                          <i className="fa-solid fa-lock"></i>
                                      </span>
                                      <input  {...register('seed',{
                                        // required :'OTP is required',
                                        pattern: {
                                              // value: /^[0-9]{4}$/,/
                                               message: 'OTP code must consist of 6 digits only'
                                        }
                                
      
                                      })} type="text" className="form-control" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1"/>
                                 </div>
                                {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
                                <div className="input-group mb-3">
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

                                    <div className="input-group mb-3">
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
                                    {errors.confirmPassword && (
                                      <span className="text-danger">{errors.confirmPassword.message}</span>
                                    )}
      
                                
                                 <button className='btn btn-success w-100'>Reset Password</button>
                                 <ToastContainer />
                      </form>
      
                </div>
      
           </div>
  )
}
