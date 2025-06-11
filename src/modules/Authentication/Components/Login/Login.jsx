import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../../assets/images/logo.png";
import { AuthContext } from "../../../../Context/AuthContext";
import { axiosInstance, USERS_URLS } from "../../../../Services/url";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/vaildition";


export default function Login() {
  // useForm هي الهوك الي بيقول للكمبوننت اني بشتغل بالرياكت هوك
  // الفورم هي الداتا الي بتعامل معاها + الجزء تاع الفلديشن +الجزء تاع ال api
  // register هيشيل الداتا تعت الفورم وهي بتشيلها اليوز فورم
  // البارت التاني هو الفالديشن
  // handelsumbit هي الفنكشن الي الفورم هتنربط فيها لما اعمل سبمت
  // (1)
  const [isSecondPasswordVisible, setIsSecondPasswordVisible] = useState(false)
  let {
    register,
    formState: { errors , isSubmitting },
    handleSubmit,
  } = useForm();
  let { saveLoginData } = useContext(AuthContext);
  let navigate = useNavigate({mode:"onChange"});
  // (2)
  const onSubmit = async (data) => {
    console.log(data);
    //  api integration
    try {
      let response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      console.log(response);
      toast.success("You have successfully logged in ✅");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      navigate("/dashboard");
    } catch (error) {
      toast.error(response?.error.message || "login failed");
    }
  };

  return (
    <>
      <div className="col-md-5 bg-light px-5 py-4 rounded-3">
        <div className="">
          <div className="logo-container text-center">
            <img className="w-25" src={logo} alt="food-logo" />
          </div>
          <div className="title">
            <h4>Log In</h4>
            <p className="text-muted">
              Welcome Back! Please enter your details
            </p>
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
              <input
                {...register("email", EMAIL_VALIDATION)}
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            {/* الايرورز من الرياكت هوك ولازم اعرفه لاي بروبرتي */}
            {/* بداخل السبان لازم احددله جمله الايرور الي هتطلع واي وجده فيهم*/}
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                {...register("password", PASSWORD_VALIDATION)}
                type={isSecondPasswordVisible? "text" :"password"}
                className="form-control"
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <button type='button' className="input-group-text" id="basic-addon1"  onClick={()=>setIsSecondPasswordVisible((prev)=>!prev)} onMouseDown={(e)=>e.preventDefault()  
                                       } onMouseUp={(e)=>e.preventDefault()}>
                                        <i className={`fa-solid ${isSecondPasswordVisible? "fa-eye" : "fa-eye-slash" } `} aria-hidden='true'></i>
                                        
                                      </button>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}

            <div className="Links d-flex justify-content-between my-4">
              <Link to="/register" className="text-decoration-none text-black">
                Register Now?
              </Link>
              <Link
                to="/forget-pass"
                className="text-decoration-none text-danger"
              >
                Forget Password?
              </Link>
            </div>
            <button disabled={isSubmitting} className="btn btn-success w-100">{isSubmitting? "isSubmitting....." :"Log In"}</button>
          </form>
        </div>
      </div>
    </>
  );
}

// ملاحظة طالما ما دخلتي في الانمبت اي واحد فيهم مش هيسير اللوق لانو الفورم مش فاليد
// عشان يكلم السبمت لازم الفورم بتاعتي تكون فاليد فورم
// مين الي حكاله ما تعمل لسا مش فاليد الرياكت هوك فورم
// +موجود Real Time Vaildition
// انا والباك بنكون متفقين على الباترن
