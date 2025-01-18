import React from "react";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import BtnG from "../components/Core/HomePage/BtnG";
import { Link } from "react-router-dom";
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  
  return (
    <div>
      <h3 className="font-bold text-2xl text-mango-green">My profile</h3>
      <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[150px] flex justify-between items-center  bg-[#E5E4E2]">
        <div className=" flex  gap-2 p-4 ">
          <img
            src={user.image}
            className="w-[50px]  aspect-square rounded-full"
          />
          <div className="ml-3">
            <h5 className="font-bold text-[20px] ">
              {user.firstName} {user.lastName}
            </h5>
            <p>{user.email}</p>
          </div>
        </div>

        <Link to="/dashboard/settings">
          <button
            className="bg-mango-green text-lemon-yellow hover:text-mango-green hover:bg-white px-4 py-2  text-sm  text-center rounded-xl transition-all duration-500 ease-in-out mr-5"
            style={{ minWidth: "100px", minHeight: "40px" }}
          >
            <div className="flex items-center justify-center gap-3">
              Edit <BiEdit className="text-lg" />{" "}
            </div>
          </button>
        </Link>
      </div>

      <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[300px] flex flex-col items-center bg-[#E5E4E2] p-6 shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between w-full items-center mb-6">
          <p className="font-bold text-lg text-gray-800">Personal Details</p>

          <Link to="/dashboard/settings">
            <button
              className="bg-mango-green text-lemon-yellow hover:text-mango-green hover:bg-white px-4 py-2 text-sm text-center rounded-xl transition-all duration-500 ease-in-out flex items-center gap-2"
              style={{ minWidth: "100px", minHeight: "40px" }}
            >
              Edit <BiEdit className="text-lg" />
            </button>
          </Link>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* First Column */}
          <div className="flex flex-col">
            <p className="text-gray-600 font-semibold">First Name</p>
            <h2 className="text-gray-900 font-bold text-lg">
              {user.firstName}
            </h2>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600 font-semibold">Last Name</p>
            <h2 className="text-gray-900 font-bold text-lg">{user.lastName}</h2>
          </div>

          {/* Second Column */}
          <div className="flex flex-col">
            <p className="text-gray-600 font-semibold">Email</p>
            <h2 className="text-gray-900 font-bold text-lg">{user.email}</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600 font-semibold">Phone Number</p>
            <h2 className="text-gray-900 font-bold text-lg">
              {user.contactNumber}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
