import React, { useEffect, useState } from 'react'
import { MdContactSupport } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Requirements = ({label , name  , register , setValue , getValues , errors }) => {
  
  const [AllRequirements , setAllRequirements] = useState([]);
  const [requirements , setRequirements] =useState("");
  const { editCourse, course } = useSelector((state) => state.course)
  // you need to undestand one hing that this is an array and you need to understand about constamt learing
  useEffect(() => {
    if(editCourse){
        setAllRequirements(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 })

  } , [])

  useEffect(() => {
     setValue(name , AllRequirements);
  } , [AllRequirements])
  
  

  const handleAddRequirement = (event) => {
        event.preventDefault();
        if(requirements){
            setAllRequirements([...AllRequirements, requirements]);
            setRequirements("");
            
        }
        console.log(AllRequirements.length);
  }
    
  function handleDeleteRequirement(index , e){
        e.preventDefault();      
        const newRequirements = AllRequirements.filter((_ , i) => i !== index);
        setAllRequirements(newRequirements);
       
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-black">{label} <sup className='text-pink-700'>*</sup></label>
       
       <div className="flex flex-col items-start space-y-2">
         <input
            className='form-style w-full '
            placeholder= {`Enter ${label}`}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)} 
         />
         <button 
         className='font-semibold text-mango-green'
         onClick={handleAddRequirement}
         >
            add
         </button>
       </div>

       {
           AllRequirements.length > 0 && (
             <ul className='mt-2  text-mango-green'>
               {
                AllRequirements.map((requirement , index) => (
                    <ul key = {index} className='mt-2'>
                       <span>{requirement}</span>
                       <button 
                         onClick={(e)=> handleDeleteRequirement(index , e)}
                         className='ml-2 text-xs text-pure-greys-300 '>
                         clear
                       </button>
                    </ul>
                ))
                   
               }

             </ul>
           )
       }  
       {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default Requirements