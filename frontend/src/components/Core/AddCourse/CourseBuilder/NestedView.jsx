import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from 'react-icons/fa'
import ConfirmmationModal from '../../../../Dashboard/ConfirmmationModal'
import { deleteSection } from '../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'
import SubSectionModal from './SubSectionModal'
const NestedView = ({handleEditSectionName}) => {
  const [confirmationModal , setConfirmationModal] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [addSubSection  , setAddSubSection] = useState(null); 
  const [viewSubSection , setViewSubsection]= useState(null);
  const [editSubSection , setEditSubsSection] = useState(null);

  
  useEffect(() => {
    // just for testing 
    console.log(course);
    console.log(course?.courseContent);
    console.log(confirmationModal);
    
    // console.log(course?.courseContent?.subSection);
    
  });
  
  const handleDeleteSection = async (sectionId) => {
        let result ;
        result = await deleteSection({sectionId , courseId : course._id} , token);
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
  }
  
  
    
  
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
                             <button
                                onClick={() => handleEditSectionName(section._id , section.SectionName)}>
                                <MdEdit className="text-xl text-richblack-300"/>
                             </button>

                             <button
                              onClick={() => setConfirmationModal({
                                text1:"Are you sure ! you wanted to delete this section" , 
                                text2 : "Deleting this Section will also Delete all the subsections with it !" , 
                                btn1Text : "Delete" , 
                                btn2Text :"Cancel" , 
                                btn1Handler : () => handleDeleteSection(section._id) , 
                                btn2Handler: () => setConfirmationModal(null) , 
                              })}
                             >
                             <RiDeleteBin6Line className="text-xl text-richblack-300" />
                             </button>
                             
                             <span className="font-medium text-richblack-300">|</span>
                             <AiFillCaretDown className={`text-xl text-richblack-300`} />


                        </div>
                    </summary>

                    <div className='px-6 pb-4'>
                         {
                            section.subSection.map((data) => (
                                <div 
                                 onClick={() => setViewSubsection(data)}
                                 className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-mango-green py-2" >
                                     
                                      <div className='flex items-center gap-x-3 py-2'>
                                      <RxDropdownMenu className="text-2xl text-richblack-50" />
                                         <p  className="font-semibold text-black">
                                            {data?.title}
                                         </p>
                                      </div>
                                       
                                    <div  className="flex items-center gap-x-3">
                                       
                                     {/* editing the subsection is pending */}
                                      <button 
                                       >
                                          <MdEdit/>
                                      </button>
                                      
                                      {/* to delete this particular section */}
                                      <button>
                                          
                                          <RiDeleteBin6Line/>
                                      </button>

                                    </div>
                                     
                                </div>
                            ))
                         }
                         
                         <button 
                         onClick={() => setAddSubSection(section._id)}
                         className='mt-3 flex items-center gap-x-1 text-mango-green'>
                            <FaPlus className='text-lg'/>
                            <p>Add Lecture</p>
                         </button>

                         
                    </div>
                    
                    
              </details>
           ))  
        }
        
       
        </div> 
        {/* there are three things weather we are adding a subSection of editing a subSection or just viewing the subSection */}
        {/* subsection modal here just kind of a form */}

        {confirmationModal ? (<ConfirmmationModal modalData={confirmationModal}/>) : (<></>)}
        {addSubSection ? 
        (<SubSectionModal add = {true} modalData = {addSubSection} setModalData = {setAddSubSection} />) : (<></>)}


        {viewSubSection ?
        (<SubSectionModal view = {true}   modalData={viewSubSection} setModalData={setViewSubsection}/>) : (<></>)}
        


    </>
  )
}

export default NestedView