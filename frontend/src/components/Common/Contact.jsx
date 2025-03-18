import React, { useEffect } from "react";
import countrycode from '../../data/countrycode.json';
import { IoIosSend } from "react-icons/io";


const Contact = () => {

 useEffect(() => {
   console.log(countrycode);
 } , []);

  return (
    <div>
      <form className="rounded-md border-[1px]  border-yellow-400 p-[40px] bg-soft-gray space-y-8 flex flex-col"
>
        <div className="flex gap-[30px]">

           <div className="flex flex-col space-y-2">
               
            <label className="text-sm text-black" >FirstName</label>
            <input
             className="form-style w-full "
             placeholder="Enter first name"

            />

           </div>

            <div className="flex flex-col space-y-2">
            <label className="text-sm text-black" >LastName</label>
            <input 
                className="form-style w-full"
                placeholder="Enter Last name"

            />
            </div>


        </div>

        <div className="flex flex-col space-y-2">
            <label className="text-sm text-black" >Email Address</label>
            <input
             className="form-style w-full "
             placeholder="Enter Email Address"

            />
        </div>

        <div className="flex flex-col space-y-2">
             <label className="text-sm text-black">Enter Phone Number</label>

             <div className="flex  gap-[30px]">
                  
                <select className="form-style w-[20%] p-[2px]">
                {
                    countrycode.map((code , index) => (
                        <option key={index} className="">{code.code} </option>
                    ))
                }
                    
                </select>

                  <input
                    className="form-style w-full"
                    placeholder="Enter Phone Number"

                  />
             </div>
        </div>

        <div className="flex flex-col space-y-2">
           <label className="text-sm text-black">Enter whatever you wanted to ask</label>
           <textarea
            className="form-style h-[200px]"
            placeholder="any Queries ?"
           />
        </div>


        <button
         typeof="submit"
         className="yellowButton">
              <div className="flex items-center justify-center m-2 gap-[20px]">Send Message <IoIosSend /></div>  
        </button>
      </form>
    </div>
  );
};

export default Contact;
