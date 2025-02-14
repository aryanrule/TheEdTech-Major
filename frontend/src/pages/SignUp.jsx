import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constant';
import Tab from '../components/Core/Auth/Tab';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slices/authSlice';
import { sendOTP } from '../services/operations/authApi';
import fileManager from '../assets/assets';

function SignUp(){   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);  // ionitially it is student
  const [formData , setFormData] = useState({
        firstName:""  , 
        lastName:"" , 
        email:"" , 
        password:"" , 
        confirmPassword:"" ,  
        phoneNumber:"" , 
  });
  
  

  function changeHandler(event){
      setFormData((prevData) => ({
         ...prevData  , [event.target.name] : event.target.value,
      }));   
  
  }

   
  const {firstName , lastName , email , password , confirmPassword , phoneNumber} = formData;

  const submitHandler = (event) => {
      event.preventDefault();  // to avoid the default behaviour of browser which is reinitialization of app or to avoid rerendering
      if(password !== confirmPassword){
        toast.error('password not matching');
        return 
      } 


      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailPattern.test(email)){
        toast.error("please enter a valid email");
        return 
      }

      const signupData = {
        ...formData , accountType 
      }

      

      dispatch(setSignupData(signupData));
    

      //send otp
      dispatch(sendOTP(formData.email , navigate));
  
      setFormData({
        firstName:"" , 
        lastName:"" , 
        phoneNumber:"" , 
        email:"" , 
        password:"" , 
        confirmPassword:"" , 
         
      });
      setAccountType(ACCOUNT_TYPE.STUDENT);      
  } 

  const tab_data = [
    {
      id:'1' , 
      tabName :'Student' , 
      type:ACCOUNT_TYPE.STUDENT ,
    } , 
    {
      id:'2' , 
      tabName:'Instructor' , 
      type:ACCOUNT_TYPE.INSTRUCTOR, 
    }
  ] 
 
  return (
       <div className='flex items-center  justify-center gap-[20px]   h-[100vh] overflow-x-hidden p-3 '>
            <div className="flex  flex-col items-center  gap-5 ">
         
         <h1 className="font-bold text-4xl">Join AceEdify Today ! </h1>
         <h4 className="font-medium  ">Yogesh and Rahul already  learning at a pace ! Lets learn with them   </h4>

         <div className="flex gap-3">
             <img src={fileManager.s1} className="h-[60px] rounded-2xl border-3 border-mango-green border-2"/>
             <img src={fileManager.s3} className="h-[60px] w-[50px] rounded-full border-mango-green border-2 "/>
             <img src={fileManager.s4} className="h-[60px]  w-[70px] rounded-full border-mango-green border-2"/>
             <img src={fileManager.s5} className="h-[60px] w-[70px] rounded-full border-mango-green border-2"/>
             <img src={fileManager.s2} className="h-[60px] rounded-full border-mango-green border-2 "/>

         </div>
     
      </div>
      
      <div className="h-[400px] w-[1px] bg-mango-green opacity-1">

      </div>
        
           <div className='flex flex-col gap-6'>
                <Tab tab_data={tab_data} setField ={setAccountType} field = {accountType}/>

                <form onSubmit={submitHandler}>
                 
                    <div className=''>
                          <div className='flex gap-2 '>
                            <div className='flex flex-col'>
                            <label htmlFor ='firstName' className="font-bold text-xl">FirstName</label>
                              <input
                                placeholder='Enter FirstName'
                                type='text' 
                                name='firstName' 
                                value={formData.firstName} 
                                required 
                                onChange={changeHandler}
                                className='form-style border-mango-green border-2 h-[40px]'
                                
                              />
                            </div>

                              <div className='flex flex-col '>
                              <label htmlFor = 'lastName' className="font-bold text-xl">LastName</label>
                              <input
                                placeholder='Enter Last Name'
                                type='text' 
                                name='lastName'
                                value={formData.lastName}
                                required
                                onChange={changeHandler}
                                className='form-style border-mango-green border-2 h-[40px]'
                              />
                              </div>
                          </div>

                          <div className='flex  mt-3  flex-col '>
                             <label htmlFor='email'  className="font-bold text-xl">Email</label>
                             <input
                                placeholder='Enter email address'
                                type='text'
                                name='email'
                                value={formData.email}
                                required 
                                onChange={changeHandler}
                                className='form-style border-mango-green border-2 h-[40px] w-[450px] '

                             />
                          </div>

                          <div className='flex flex-col mt-3 '>
                              <label htmlFor ='phone' className="font-bold text-xl">Phone Number</label>
                              <input 
                                placeholder='Enter Phone Number'
                                type='number'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={changeHandler}
                                required
                                className='form-style border-mango-green border-2 h-[40px] w-[450px] '
                                
                              />

                          </div>

                          <div className='flex gap-2 mt-3'>
                             <div className='flex flex-col'>
                             <label htmlFor = 'password' className="font-bold text-xl">Create PassWord</label>
                              <input
                                placeholder='Enter passWord'
                                type='text'
                                name='password'
                                value={formData.password}
                                required = {true}
                                onChange={changeHandler}
                                className='form-style border-mango-green border-2 h-[40px]'

                              />
                             </div>
                              
                             <div className='flex flex-col'>
                             <label htmlFor = 'confirmPassword' className="font-bold text-xl">Confirm Password</label>
                              <input
                                placeholder='Enter Your Password'
                                type='text'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                required = {true}
                                onChange={changeHandler}
                                className='form-style border-mango-green border-2 h-[40px]'

                              />
                             </div>
                          </div>


                          <button onClick={submitHandler} className='greenButton mt-6 w-[450px]' >Create Account</button>
                          <div className='mt-2'> Already have a Account? 
                          
                          <Link to='/login'>
                              <span className='text-mango-green'> Sign In</span>
                          </Link>
                          
                          </div>
                    </div>
                </form> 
           </div>
       </div>
  )
}

export default SignUp