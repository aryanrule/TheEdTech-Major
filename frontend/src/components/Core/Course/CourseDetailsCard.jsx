import React from 'react'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"

const CourseDetailsCard = ({course}) => {
  
  const {
    thumbnail : thumbnailImage , 
    price : currentPrice} = course;

  return (
    <>
       <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
       >

         <img
            src={thumbnailImage}
            alt={course?.courseName}
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
         />

        <div className='px-4'>
           <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {currentPrice}
           </div>
           
           <div className="flex flex-col gap-4">

              {/* here lots of changes are requried  */}
               <button className='yellowButton'>
                      buy now 
               </button>

               <button className='blackButton'>
                    Add to cart
               </button>
           </div>

           <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
             <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>

            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
               {course?.instructions?.map((item , index)=>{
                  return (
                    <p className={`flex gap-2`} key = {index}>
                         <BsFillCaretRightFill/>
                         <span>{item}</span>
                    </p>
                  )
               })}
            </div> 
          </div>
         
         {/* handle share is leftover here  */}
         <div className="text-center">
            <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
            
            >
              <FaShareSquare size={15} /> Share  
            </button>
         </div>

        </div>         
       </div>
    </>
  )
}

export default CourseDetailsCard