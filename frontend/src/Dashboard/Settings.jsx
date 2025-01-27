import React from 'react'
import UpdatePicture from '../components/Core/Settings/UpdatePicture'
import ProfileInfo from '../components/Core/Settings/ProfileInfo'
import DeleteAccount from '../components/Core/Settings/DeleteAccount'
import UpdatePassword from '../components/Core/Settings/UpdatePassword'

const Settings = () => {
  return (
    <div >
         <h2 className='font-bold text-2xl text-mango-green'>Edit</h2>

         <UpdatePicture/>
         <ProfileInfo/>
         <UpdatePassword/>
         <DeleteAccount/>

    </div>
  )
}

export default Settings