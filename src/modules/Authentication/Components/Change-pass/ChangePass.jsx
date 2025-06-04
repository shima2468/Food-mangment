import React, { useEffect, useState } from 'react';
import logo from "../../../../assets/images/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../Services/url';
import { PASSWORD_VALIDATION } from '../../../../Services/vaildition';

export default function ChangePass() {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger
  } = useForm({
    defaultValues: { email: location.state },
    mode: "onChange"
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    try {
   
      let response = await axiosInstance.put(USERS_URLS.CHANGE_PASS, {
         oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      });

      toast.success('Password has been reset successfully ✅');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (watch("confirmNewPassword")) {
      trigger("confirmNewPassword");
    }
  }, [watch("newPassword"), watch("confirmNewPassword")]);

 return (
  <div className="d-flex justify-content-center align-items-center mt-5">
    <div className="card shadow p-4" >
      <div className="text-center mb-4">
        <img src={logo} alt="food-logo" className="w-25 mb-3" />
        <h4 className="fw-bold">Change Password</h4>
        <p className="text-muted">Please enter your current and new password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">

        {/* Old Password */}
        <div className="input-group">
          <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
          <input
            {...register('oldPassword', PASSWORD_VALIDATION)}
            type={isOldPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Old Password"
          />
          <button type="button" className="input-group-text" onClick={() => setIsOldPasswordVisible(prev => !prev)} onMouseDown={(e) => e.preventDefault()}>
            <i className={`fa-solid ${isOldPasswordVisible ? "fa-eye" : "fa-eye-slash"}`}></i>
          </button>
        </div>

        {/* New Password */}
        <div className="input-group">
          <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
          <input
            {...register('newPassword', PASSWORD_VALIDATION)}
            type={isNewPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="New Password"
          />
          <button type="button" className="input-group-text" onClick={() => setIsNewPasswordVisible(prev => !prev)} onMouseDown={(e) => e.preventDefault()}>
            <i className={`fa-solid ${isNewPasswordVisible ? "fa-eye" : "fa-eye-slash"}`}></i>
          </button>
        </div>
        {errors.newPassword && <small className="text-danger">{errors.newPassword.message}</small>}

        {/* Confirm Password */}
        <div className="input-group">
          <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
          <input
            {...register('confirmNewPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === newPassword || 'Passwords do not match',
            })}
            type={isConfirmPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Confirm Password"
          />
          <button type="button" className="input-group-text" onClick={() => setIsConfirmPasswordVisible(prev => !prev)} onMouseDown={(e) => e.preventDefault()}>
            <i className={`fa-solid ${isConfirmPasswordVisible ? "fa-eye" : "fa-eye-slash"}`}></i>
          </button>
        </div>
        {errors.confirmNewPassword && (
          <small className="text-danger">{errors.confirmNewPassword.message}</small>
        )}

        <button disabled={isSubmitting} className="btn btn-success w-100">
          {isSubmitting ? "Processing..." : "Reset Password"}
        </button>

        <ToastContainer />
      </form>
    </div>
  </div>
);

}
