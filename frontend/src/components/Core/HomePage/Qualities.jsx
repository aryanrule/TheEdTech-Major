import React from 'react'
import { FiAward } from "react-icons/fi";
import fileManager from '../../../assets/assets';

const Qualities = () => {
 
  const data = [
    {
        logo:fileManager.leadership , 
        title : 'Leadership' , 
        desc : 'Fully committed to the success company' , 

    } , 
    {
        logo:fileManager.hat  , 
        title : 'Responsibility' , 
        desc : 'student will always be our top priority' , 

    } , 
    {
        logo : fileManager.diamond , 
        title : 'Flexibility' ,
        desc : 'The ability to switch is an important skills' , 
    } , 
    {
        logo:fileManager.codelogo , 
        title : 'Solve the problem' , 
        desc : 'Code your way to a solution' , 
    }
  ]



 
  return (
    <div className='flex flex-col '>
        
      {data.map((item , index) => (
          <div key={index} className='flex gap-5 mt-[60px]' >
               <img src={item.logo} className='w-[50px] '/>

               <div className=''>
                  <h1 className='font-bold text-[20px]'>{item.title}</h1>
                  <p className=' font-medium  opacity-50'>{item.desc}</p>
               </div>
                
          </div>
      ))}
      {/* {
         data.map((item ,index) => {
            if(index < 3) {
                return (<div key={index} className='border-2  border-dashed bottom-1'></div>)
            }
         })
      } */}
    </div>
  )
}

export default Qualities