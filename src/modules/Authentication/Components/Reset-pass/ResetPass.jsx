import React, { useEffect, useState } from 'react'
import logo from "../../../../assets/images/logo.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../../../Services/url'
import { PASSWORD_VALIDATION } from '../../../../Services/vaildition'
import { EMAIL_VALIDATION } from '../../../../Services/vaildition'

export default function ResetPass() {
  const [isFirstPasswordVisible, setIsFirstPasswordVisible] = useState(false)
  const [isSecondPasswordVisible, setIsSecondPasswordVisible] = useState(false)
   let Navigate=useNavigate();
   const location = useLocation() 
  //  console.log(location)
  // mode:"onChange" (كل تغيير بده يسير روح شوفلي اي فورم فالديشن عامله ازاي )
  // ضفناها لانو الفالديشن ما كانت تشتغل غير لما  اعمل سبمت تقلي الكونفرميشن باسورد غلط فلما ضفتها سارت تشتغل قبل و
  // انو انا لما اكتب في الباسوردانمبت يعمل تريقررللكونفرميشن يعني يقله شغلي الفالديشين تاع التاني
  // شغلي ياه تاني مش تفحص بس اول مره 
  let { register, formState: { errors , isSubmitting}, handleSubmit, watch , trigger } = useForm({defaultValues:{email:location.state}, mode:"onChange"});
  //  watch هي اعطيها اسم اي انمبت بتبص على الفاليو الي جواه
   const password = watch('password');
   const onSubmit =async(data)=>{
       console.log(data);
      //  api integration
    try {
    let response = await axiosInstance.post(USERS_URLS.RESET_PASS, data);
    console.log(response);

    toast.success('Password has been reset successfully ✅');
    setTimeout(() => {
      Navigate('/dashboard');
    }, 2000); // عشان المستخدم يشوف التنبيه
  } catch (error){
          toast.error(error.response.data.message || "Failed");
          console.log(error)
      }
  }

  useEffect(()=>{
  //  [watch("password")] انو اول ما يتغير بالباسورد اعملي 
  // Re-Run for useEffect code
  // هيك هيسير اول ما اكتب في الانمبت تاع الباسورد هيشوف انو حصل فيه هالانمبت تغيير
  // هيروح يعمل حاجه اسمها تريقرر
  // تريقرر ايش بتعمل للكونفريم باسورد بتقلها شغلي الفالديت الي جواكي 
  if(watch("confirmPassword")){
                 trigger("confirmPassword")
  }
 
  },[watch("password"),watch("confirmPassword")])
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
                                      <input {...register('email',EMAIL_VALIDATION )}  disabled   type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                                 </div>
                                 {/* الايرورز من الرياكت هوك ولازم اعرفه لاي بروبرتي */}
                                 {/* بداخل السبان لازم احددله جمله الايرور الي هتطلع واي وجده فيهم*/}
                                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                 <div className="input-group mb-3">
                                      <span className="input-group-text" id="basic-addon1">
                                          <i className="fa-solid fa-lock"></i>
                                      </span>
                                      <input {...register('seed',{
                                        required :'OTP is required',
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
                                        {...register('password',PASSWORD_VALIDATION )}
                                        type={isFirstPasswordVisible? "text":"password"}
                                        className="form-control"
                                        placeholder="Password"
                                      />
                                    
                                       <button type='button' className="input-group-text" id="basic-addon1" onClick={()=>setIsFirstPasswordVisible((prev)=>!prev)} onMouseDown={(e)=>e.preventDefault()
                                       } onMouseUp={(e)=>e.preventDefault()}>
                                          {/* <span className='sr-only'>{isFirstPasswordVisible? "hidePassword":"showPassword"}</span> */}
                                        <i className={`fa-solid ${isFirstPasswordVisible ? "fa-eye" : "fa-eye-slash" } `} aria-hidden='true'></i>
                                      </button>

                                    </div>
                                    {errors.password && <span className="text-danger">{errors.password.message}</span>}

                                    <div className="input-group mb-3">
                                      <span className="input-group-text" id="basic-addon1">
                                        <i className="fa-solid fa-lock"></i>
                                      </span>
                                      <input
                                        {...register('confirmPassword', {
                                          required: 'confirmPassword is required',
                                          // الفالديت الها اكسس ع القيمة الموجودة داخل الكونفيرم باسورد
                                          validate: (value) =>
                                            value === password || 'Passwords do not match',
                                        })}
                                        type={isSecondPasswordVisible? "text":"password"}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                      />
                                     <button type='button' className="input-group-text" id="basic-addon1" onClick={()=>setIsSecondPasswordVisible((prev)=>!prev)} onMouseDown={(e)=>e.preventDefault()
                                       } onMouseUp={(e)=>e.preventDefault()}>
                                        <i className={`fa-solid ${isSecondPasswordVisible? "fa-eye" : "fa-eye-slash" } `} aria-hidden='true'></i>
                                      </button>
                                    </div>
                                    {errors.confirmPassword && (
                                      <span className="text-danger">{errors.confirmPassword.message}</span>
                                    )}
      
                                
                                 <button disabled={isSubmitting} className='btn btn-success w-100'>Reset Password</button>
                                 <ToastContainer />
                      </form>
      
                </div>
      
           </div>
  )
}
