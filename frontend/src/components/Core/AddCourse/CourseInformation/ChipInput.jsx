import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io";

const ChipInput = ({label , name , placeholder , register , errors , setValue}) => {

  const {editCourse , course} = useSelector((state) => state.course);
  const [chips , setChips] = useState([]); 
    
//   only edit course is pending 
  useEffect(() => {
    if(editCourse){
       setValue(name , course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    
  })
   
  useEffect(() => {
     setValue(name , chips);
  },[chips])
  
  const handlekeydown = (event) => { 
      if(event.key === "Enter" || event.key === ','){
        event.preventDefault();

        const chipValue = event.target.value.trim();
        console.log(chipValue);
        if(chipValue && !chips.includes(chipValue)){
            // preserve the past values and then add this to it 
            const newChips = [...chips , chipValue];
            setChips(newChips);
            event.target.value = "";
        }
      }
  }

  const deleteChipHandler = (chipIndex , event) => {
    //delete this chip with corresponding index 
    event.preventDefault();
    const delete_and_updateChips  = chips.filter(( _, index) => index !== chipIndex);
    setChips(delete_and_updateChips);
  }

  return (
    <div className='flex flex-col space-y-2 relative'>
       <label className='text-sm text-black' htmlFor={name}>{label}<sup className='text-pink-700 text-md'>*</sup></label>

       {/* render the chip input here  */}
       <div className='flex w-full flex-wrap gap-y-2'>
       {
          chips.map((chip , index)=> (
            <div className='m-1 flex items-center rounded-full bg-mango-green px-2 py-1 text-sm text-richblack-5' key = {index}>
               {chip}

               <button 
               onClick={(event)=> deleteChipHandler(index , event)}
               className='p-[1px]'>
                <IoMdClose/>
               </button>
            </div>

           
          ))
       }        
       </div>
    
     
       <input
        id={name}
        name = {name}
        type='text'
        className='form-style w-full'
        placeholder={placeholder}
        onKeyDown={handlekeydown}
        
       />
       {
        errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              {label} is required
            </span>
        ) 
       }
    </div>
  )
}

export default ChipInput