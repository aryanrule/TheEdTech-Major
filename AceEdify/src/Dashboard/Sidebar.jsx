import React, { useState } from 'react'
import { sidebarLinks } from '../data/dashboardlink'
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './sidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import { logout } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import ConfirmmationModal from './ConfirmmationModal';

const Sidebar = () => {
  const {user , loading:profileLoading} = useSelector((state)=>state.profile);
  const {loading : authLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmmationModel , setConfirmmationModal] = useState(null);
  if(authLoading || profileLoading){
    return <div>loading...</div>
  }
  
  return ( 
    <div className='flex flex-col min-w-[220px] h-[calc(100vh-3.5rem)] border-r-[1px] bg-soft-gray'>
        <div className='flex flex-col'>
          {sidebarLinks.map((link)=> {
            if(link.type && link.type !== user?.accountType) return null
            return (
              <SidebarLink key = {link.id} link = {link} iconName = {link.icon}/>
            )
          })}
        </div> 

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-mango-green" />
        
        <div className='flex flex-col'>
          <SidebarLink link = {{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear"/>
          <button 
            onClick={()=>
              setConfirmmationModal({
                text1:'Are you sure ?', 
                text2:'you will be logged out of your account' , 
                btn1Text:'Logout' , 
                btn2Text:'Cancel' , 
                btn1Handler:() => dispatch(logout(navigate)) , 
                btn2Handler:() => setConfirmmationModal(null) ,
              })
            }
          
          className="px-8 py-2 text-sm font-medium text-richblack-300  ml-4 mt-3">
          <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>

          {confirmmationModel && <ConfirmmationModal modalData = {confirmmationModel}/>}
        </div>
    </div>
  )
}

export default Sidebar