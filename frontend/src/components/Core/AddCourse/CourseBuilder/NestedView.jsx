import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"



const NestedView = () => {

  const {course} = useSelector((state) => state.course);
  useEffect(() => {
    console.log(course?.courseContent);
  })


  return (

    // for every section in courseContent you need to create a section and for every subsection in the section you have to create that also 

    <>
        <div 
        className='rounded-lg   p-6 px-8 '
        id='NestedView'>
         
        {
           course?.courseContent?.map((section) => (
              //i need to make a section dropdown

              <details key = {section._id} open>
                    {/* section dropdown content*/}
                    <summary className='flex cursor-pointer items-center justify-between border-b-2 border-mango-green py-2'>
                        <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu className="text-2xl text-black" />
                        <p className="font-semibold text-mango-green">{section?.SectionName}</p>
                        </div>

                        <div className="flex items-center gap-x-3">
                             <button>
                                <MdEdit className="text-xl text-richblack-300"/>
                             </button>

                             <button>
                             <RiDeleteBin6Line className="text-xl text-richblack-300" />
                             </button>
                             
                             <span className="font-medium text-richblack-300">|</span>
                             <AiFillCaretDown className={`text-xl text-richblack-300`} />


                        </div>
                    </summary>
                    
              </details>
           ))  
        }
        </div> 
    </>
  )
}

export default NestedView