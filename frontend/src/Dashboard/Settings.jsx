import React from 'react'
import UpdatePicture from '../components/Core/Settings/UpdatePicture'
import ProfileInfo from '../components/Core/Settings/ProfileInfo'
import DeleteAccount from '../components/Core/Settings/DeleteAccount'
import UpdatePassword from '../components/Core/Settings/UpdatePassword'

const Settings = () => {
  return (
    <>
         <h2 className="mb-14 text-3xl font-medium text-black">
         Edit
         </h2>
         <UpdatePicture/>

         <ProfileInfo/>

         <UpdatePassword/>

         <DeleteAccount/>
    </>
  )
}

export default Settings