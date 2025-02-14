import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../Common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../services/operations/settingsApi';

const UpdatePassword = () => {
  const {
    register , 
    setValue , 
    getValues , 
    formState:{errors} , 
    handleSubmit
  } = useForm();
  
  const {token} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [showOldPassword , setShowOldPassword] = useState(false);
  const [showNewPassword , setShowNewPassword] = useState(false);

  const dispatch = useDispatch();

  const updatePassword = async (data) => {
      try{
         dispatch(changePassword(data , token));
      }catch(error){
        console.log("ERROR MESSAGE - ", error.message)
      }
  }
  return (
     <form onSubmit={handleSubmit(updatePassword)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-400 bg-soft-gray p-8 px-12">
          <h2 className="text-lg font-semibold text-black">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"

              >
               {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
               
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
              />
              <span
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}

              >
               {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}

              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md blackButton py-2 px-5 font-semibold "
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
  )
}

export default UpdatePassword