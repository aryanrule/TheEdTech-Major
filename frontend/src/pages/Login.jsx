import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authApi";
import { useDispatch } from "react-redux";
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
    <div>
      <div>
     
      </div>
      <div>
        <form onSubmit={submitHandler}>
        
          <div className="flex gap-10 h-[50px] bg-slate-200  w-[300px] items-center justify-center rounded-2xl cursor-pointer ">
            <div className="">Student</div>
            <div className="">Instructor</div>
          </div>

          <div>
                <div>
                <label htmlFor="email">Email Address</label>
                <input 
                  placeholder="Enter Your Email"
                  name='email'
                  value={formData.email}
                  onChange={changeHandler}
                  required={true}
                  type="text" 
                />
                </div>
                
                <div>
                <label htmlFor = "password">Enter Password</label>
                <input
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  required={true}
                  type="text"
                />
                </div>

                <Link to='/resetPassword'>
                
                <div>Forgot Password</div>
                
                </Link>
                <button type='submit'>Sign In</button>
          </div>           

        </form>
      </div>
    </div>
  );
};

export default Login;
