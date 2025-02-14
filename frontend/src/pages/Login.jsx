import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authApi";
import { useDispatch } from "react-redux";

import fileManager from "../assets/assets";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email : "" , 
    password:"" , 
  });

  const  changeHandler = (event) => {
      setFormData((prevData) => ({
         ...prevData ,  [event.target.name]:event.target.value , 
      }))
  }

  const submitHandler = (event)=> {
       event.preventDefault();
       dispatch(login(formData.email, formData.password  , navigate));
  }
  

  return (
    <div className="h-screen w-screen overflow-x-hidden flex items-center justify-center gap-6">
      <div className="flex  flex-col items-center  gap-5 ">
         
         <h1 className="font-bold text-4xl">Join AceEdify Today !</h1>
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


      <div>
        <form onSubmit={submitHandler}>
        
        

          <div className="flex  flex-col  gap-3 ">
                <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-xl">Email Address</label>
                <input 
                  placeholder="Enter Your Email"
                  name='email'
                  value={formData.email}
                  onChange={changeHandler}
                  required={true}
                  type="text" 
                  className="form-style border-mango-green border-2 w-[300px]"
                />
                </div>

                
                
                <div className="flex  flex-col mt-2 ">
                <label htmlFor = "password" className="font-bold text-xl">Enter Password</label>
                <input
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  required={true}
                  type="text"
                  className="form-style border-mango-green border-2 w-[300px]"
                />
                </div>

                
                
                <div className="text-center">Forgot Password
                
                <Link to='/resetPassword'>
                <span className="text-mango-green">  Click here ! </span>
                </Link>
          
                </div>
                
                
                
                
                    <button
                     type="submit"
                     className="greenButton w-[300px]">
                         login
                    </button>


                    <Link to='/signUp'>
                       <button className="yellowButton w-[300px]">
                             signUp
                       </button>
                    </Link>
                
          </div>       
  
        </form>
        
         

      </div>
    </div>
  );
};

export default Login;
