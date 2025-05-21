import React from 'react'
import logo from "../../../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function Login({SaveLoginData}) {
  
  let Navigate=useNavigate();
  // useForm هي الهوك الي بيقول للكمبوننت اني بشتغل بالرياكت هوك
  // الفورم هي الداتا الي بتعامل معاها + الجزء تاع الفلديشن +الجزء تاع ال api
  // register هيشيل الداتا تعت الفورم وهي بتشيلها اليوز فورم
  // البارت التاني هو الفالديشن
  // handelsumbit هي الفنكشن الي الفورم هتنربط فيها لما اعمل سبمت
  // (1)
  let {register,formState:{errors},handleSubmit} = useForm()

  // (2)
  const onSubmit =async(data)=>{
       console.log(data);
      //  api integration
      try{
          let response =await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data)
          console.log(response);
          toast.success('You have successfully logged in ✅');
          localStorage.setItem('token',response.data.token);
          SaveLoginData();
          Navigate('/dashboard')
        }catch (error){
          toast.error('Login failed ❌');
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
                    <h4 >Log In</h4>
                    <p className='text-muted'>Welcome Back! Please enter your details</p>
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
                                <input  {...register('password',{
                                  required :'password is required',
                                  pattern: {
                                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                      message: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
                                    }
                          

                                })} type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                           </div>
                          {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                           <div className="Links d-flex justify-content-between my-4">
                                <Link to='/register' className='text-decoration-none text-black'>Register Now?</Link>
                                <Link to='/forget-pass' className='text-decoration-none text-danger'>Forget Password?</Link>
                           </div>
                           <button className='btn btn-success w-100'>Log In</button>
                           <ToastContainer />
                </form>

          </div>

     </div>
  )
}

// ملاحظة طالما ما دخلتي في الانمبت اي واحد فيهم مش هيسير اللوق لانو الفورم مش فاليد 
// عشان يكلم السبمت لازم الفورم بتاعتي تكون فاليد فورم
// مين الي حكاله ما تعمل لسا مش فاليد الرياكت هوك فورم
// +موجود Real Time Vaildition
// انا والباك بنكون متفقين على الباترن