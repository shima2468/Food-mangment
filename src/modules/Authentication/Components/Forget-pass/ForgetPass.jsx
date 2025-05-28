import React from 'react'
import logo from "../../../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../../../Services/url'
import { EMAIL_VALIDATION } from '../../../../Services/vaildition'

export default function ForgetPass() {
   let Navigate=useNavigate();
   let {register,formState:{errors , isSubmitting},handleSubmit} = useForm()

  const onSubmit =async(data)=>{
       console.log(data);
      //  api integration
    try {
    let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
    console.log(response);
    toast.success('Your request is being processed, please check your email ✅');
    setTimeout(() => {
     // state شو بدك تبعت لما تحوله ع الريسيت باسورد
      Navigate('/reset-pass',{state:data.email});
    }, 2000); // عشان المستخدم يشوف التنبيه
  } catch (error){
          toast.error(error.response.data.message);
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
                    <h4 >Forgot Your Password?</h4>
                    <p className='text-muted'>No worries! Please enter your email and we will send a password reset link</p>
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
                                <input {...register('email',EMAIL_VALIDATION
                                   )}  type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                           </div>
                           {/* الايرورز من الرياكت هوك ولازم اعرفه لاي بروبرتي */}
                           {/* بداخل السبان لازم احددله جمله الايرور الي هتطلع واي وجده فيهم*/}
                          {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                           <button disabled={isSubmitting} className='btn btn-success w-100 mt-2'>{isSubmitting?"submitting...":"submit"}</button>
                           <ToastContainer />
                </form>

          </div>

     </div>
  )
}
