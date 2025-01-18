import React from 'react'

const ResetPass = () => {
  return (
    <div>
         <div>
               <h1>Reset Your password</h1>
               <p>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
         </div>
         
         <div>
             <h1>Email Address</h1>
             <input
                placeholder='Enter Your Email'
             />            
         </div>
         
         <div>
            <button>Reset PassWord</button>
         </div>
         
         <div>
            <h3>Back to login</h3>
         </div>
    </div>
  )
}

export default ResetPass