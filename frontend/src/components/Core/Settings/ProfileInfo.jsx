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

const ProfileInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });
  
  const changeHandler = (event) => {
      
  }

  return (
    <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[350px] flex justify-between items-center  bg-[#E5E4E2] border-mango-green">
      <h4 className="font-bold text-large">Profile Information</h4>

      <form>
        <div>
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            placeholder="Enter firstname"
            name="firstName"
            value={formData.firstName}
            onChange={changeHandler}
          />

          <label htmlFor="lastName">LastName</label>
          <input
            type="text"
            placeholder="Enter lastName"
            name="lastName"
            value={formData.lastName}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label htmlFor="DateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={changeHandler}
          />

          <label htmlFor="">Gender</label>
          <select onChange={changeHandler}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            onChange={changeHandler}
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
