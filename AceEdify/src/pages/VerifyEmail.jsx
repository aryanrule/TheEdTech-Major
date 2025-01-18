import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authApi';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {signupData , loading} = useSelector((state)=> state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRef  = useRef([]);
  

  const handleChange = (event , index) => {
      const value = event.target.value;
      if(isNaN(Number(value))) return ;
      
      const newOtp = [...otp];
      newOtp[index] = value
      setOtp(newOtp);

      if(value && index < 5){
         inputRef.current[index+1].focus();
      }
  }
  
  
//   const handlePaste = (event)=>{ 
//      event.preventDefault();

//      const pasteData = event.clipboardData('text/plain').slice(0 ,6);
//      if (!/^\d+$/.test(pasteData)) return;

//      const newOtp = [...otp];
//      pasteData.split('').forEach((value, index) => {
//         if(index < 6){
//             newOtp[index] = value;
//         }
//      });
//      setOtp(newOtp);

//      const lastfilledIndex = Math.min(pasteData.length-1 , 5);
//      inputRef.current[lastfilledIndex].focus(); 
     
//   }
   
  const handleKeyDown = (event , index)=>{
     if(event.key === 'Backspace'){
          if(index > 0 && !otp[index])
          inputRef.current[index-1].focus();
     }
  }

  // you wanted to signup now
  
  const clickHandler = (event) => {
       event.preventDefault();
       const {accountType ,
         email ,
         firstName ,
         lastName ,
         password ,
         confirmPassword ,
         phoneNumber} = signupData;

         let OTPstring = "";
         for(let i = 0 ; i < otp.length ; i++){
              OTPstring += otp[i];
         }
         
         const payload  = {accountType , email , firstName , lastName , password , confirmPassword , phoneNumber , OTPstring};

        dispatch(signUp(payload , navigate));
        
  }

  
  
  
  return (
    <div className="flex justify-center items-center h-screen overflow-x-hidden">
      <div className="min-w-[700px] h-[450px]  bg-slate-200 rounded-3xl flex flex-col items-center justify-center ">
           <div>Enter Verification code</div>
           <div>A verification code has been sent to you. Enter the code below</div>
           
           <div className='flex space-x-4 '>
           {
            otp.map((digit , index) => (
               <input
                key = {index}
                maxLength={1}
                required
                value={digit}
                ref = {(ref) => inputRef.current[index] = ref}
                onChange={(event)=>handleChange(event , index)}
                onKeyDown={(event)=>handleKeyDown(event , index)}
                className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg 
                     focus:border-mango-green focus:outline-none transition-colors
                     bg-white shadow-sm"
               />
            ))
           }
           </div>
           
           <button className=''
           onClick={clickHandler}>
                verify email
           </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
