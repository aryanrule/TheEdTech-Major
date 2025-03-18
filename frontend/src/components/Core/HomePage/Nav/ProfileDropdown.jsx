import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import DropdownItem from './DropdownItem';
import { logout } from '../../../../services/operations/authApi';

const ProfileDropdown = () => {
  const items = {
    itemOne : 'dashboard' , 
    itemTwo : 'logout' 
  }
  const dropdown = useRef(null);
  const [isOpen , setIsOpen] = useState(false);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = (event) => {
        event.preventDefault();
        setIsOpen((prev) => !prev);  
  }
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsOpen(false);
      } 
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  } , []);

  const handleLogout = () => {
      dispatch(logout(navigate));
  }
   
  
  return (
    <div
     onClick={clickHandler}
     ref={dropdown}
     className='flex items-center gap-2 z-[1000]'>
        
        {/* yha pe bhi ek link lgadena dashbboard k liye whenever click on image move to dashboard */}
        <img src={user?.image} className=' rounded-3xl h-[40px] w-[40px]'/>
        <IoMdArrowDropdown  className={`w-[20px] h-[20px] cursor-pointer ${isOpen ? 'rotate-180' : ""}`}/>

        {isOpen && <div className='absolute right-0  translate-x-[-10px]  translate-y-[90px]   w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200'>
            <Link to="/dashboard/my-profile">
                 {/*  link pending */}
                 <DropdownItem  title = {items.itemOne}/>
            </Link>
             
             <div onClick={handleLogout}> 
                  <DropdownItem  title = {items.itemTwo}/>
             </div>
        </div>}
    </div>
    


  )
}

export default ProfileDropdown