import React, { useState } from 'react'

const ProfileInfo = () => {
  const [formData , setFormData] = useState({
    firstName:"" , 
    lastName:"" , 
    
  });

  return (
    <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[160px] flex justify-between items-center  bg-[#E5E4E2] border-mango-green ">
         <h4 className='font-bold text-large'>Profile Information</h4>

         <form>
            <label htmlFor='firstName'>FirstName</label>
            <input 
             type='text'
             placeholder='Enter firstname'
             name='firstName'
             value={formData.firstName}

            />

            <label htmlFor='lastName'>LastName</label>
            <input
              type='text'
              placeholder='Enter lastName'
              name='lastName'
              value={formData.lastName}
            />

         </form>

    </div>
  )
}

export default ProfileInfo