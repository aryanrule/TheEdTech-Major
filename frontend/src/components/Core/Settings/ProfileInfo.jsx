// import React, { useState } from "react";

// const ProfileInfo = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     DateOfBirth: "",
//     gender: "",
//     contactNumber: "",
//     about: "",
//   });
  
//   const changeHandler = (event) => {
      
//   }

//   return (
//     <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[350px] flex justify-between items-center  bg-[#E5E4E2] border-mango-green">
//       <h4 className="font-bold text-large">Profile Information</h4>

//       <form>
//         <div>
//           <label htmlFor="firstName">FirstName</label>
//           <input
//             type="text"
//             placeholder="Enter firstname"
//             name="firstName"
//             value={formData.firstName}
//             onChange={changeHandler}
//           />

//           <label htmlFor="lastName">LastName</label>
//           <input
//             type="text"
//             placeholder="Enter lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={changeHandler}
//           />
//         </div>

//         <div>
//           <label htmlFor="DateOfBirth">Date of Birth</label>
//           <input
//             type="date"
//             name="DateOfBirth"
//             value={formData.DateOfBirth}
//             onChange={changeHandler}
//           />

//           <label htmlFor="">Gender</label>
//           <select onChange={changeHandler}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="contactNumber">Contact Number</label>
//           <input
//             onChange={changeHandler}
//             type="number"
//             name="contactNumber"
//             value={formData.contactNumber}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileInfo;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../Common/IconBtn";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.profile);
  const {
   handleSubmit , 
   register , 
   setValue , 
   getValues , 
   formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
 
 const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
    
 const submitProfileForm = () => {

 }

  return (
    <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
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
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
};

export default ProfileInfo;
