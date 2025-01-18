import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constant';
import Tab from '../components/Core/Auth/Tab';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slices/authSlice';
import { sendOTP } from '../services/operations/authApi';


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
           
        
           <div className=''>
                <form onSubmit={submitHandler}>
                  <Tab tab_data={tab_data} setField ={setAccountType} field = {accountType}/>
                  
                    <div className=''>
                          <div>
                              <label htmlFor ='firstName'>FirstName</label>
                              <input
                                placeholder='Enter FirstName'
                                type='text' 
                                name='firstName' 
                                value={formData.firstName} 
                                required 
                                onChange={changeHandler}
                                
                              />

                              <label htmlFor = 'lastName'>LastName</label>
                              <input
                                placeholder='Enter Last Name'
                                type='text' 
                                name='lastName'
                                value={formData.lastName}
                                required
                                onChange={changeHandler}
                              />
                          </div>

                          <div>
                             <label htmlFor='email'>Email</label>
                             <input
                                placeholder='Enter email address'
                                type='text'
                                name='email'
                                value={formData.email}
                                required 
                                onChange={changeHandler}
                             />
                          </div>

                          <div>
                              <label htmlFor ='phone'>Phone Number</label>
                              <input 
                                placeholder='Enter Phone Number'
                                type='number'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={changeHandler}
                                required
                              />

                          </div>

                          <div>
                              <label htmlFor = ''>Create PassWord</label>
                              <input
                                placeholder='Enter passWord'
                                type='text'
                                name='password'
                                value={formData.password}
                                required = {true}
                                onChange={changeHandler}
                              />

                              <label htmlFor = ''>Confirm Password</label>
                              <input
                                placeholder='Enter Your Password'
                                type='text'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                required = {true}
                                onChange={changeHandler}
                              />
                          </div>


                          <button onClick={submitHandler}>Create Account</button>
                          <div> Already have a Account? 
                          <Link to='/login'>
                              <span>Sign In</span>
                          </Link>
                          
                          </div>
                    </div>
                </form> 
           </div>
       </div>
  )
}

export default SignUp