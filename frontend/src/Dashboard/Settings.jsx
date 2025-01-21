import React from 'react'
import UpdatePicture from '../components/Core/Settings/UpdatePicture'
import ProfileInfo from '../components/Core/Settings/ProfileInfo'

const Settings = () => {
  return (
    <div>
         <h2 className='font-bold text-2xl text-mango-green'>Edit</h2>

         <UpdatePicture/>
         <ProfileInfo/>
    </div>
  )
}

export default Settings