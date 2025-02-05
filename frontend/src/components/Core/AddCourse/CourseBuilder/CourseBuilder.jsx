import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../Common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { MdNavigateNext } from "react-icons/md"
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { updateSection } from '../../../../services/operations/courseDetailsAPI';
// WEATHER YOU ARE CREATING A SECTION OR YOU ARE JUST EDITING THE SECTION 

const CourseBuilder = () => {
  const [loading , setLoading] = useState(false);
  const [editSectionName , setEditSectionName]= useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();

  const {
      register , 
      handleSubmit , 
      formState:{errors} , 
      setValue , 
      getValues , 

  } = useForm();


  const onSubmit =async (data) => {
    setLoading(true);
    console.log(course);
    // there are two possibilities weather you are editing your section Name in your course or you are actually creating a new course 
    let result ;
    if(editSectionName){
        // logic if the sectionName is in edit mode
         const value = {courseId : course?._id , sectionName:data.sectionName , sectionId : editSectionName};
         result = await updateSection(value , token);
         
    }else {
      const value = {SectionName : data.sectionName , CourseId:course._id};
      result = await createSection(value ,  token); 
      console.log(result);  // these all are section of your current course 

    }
    if(result){
        dispatch(setCourse(result)); // updating the state with updation in section also 
        setEditSectionName(null);
        setValue("sectionName" , "");
        console.log(course);

    }
    setLoading(false);
  }

  const goBack = (e) => {
       dispatch(setStep(1));
       dispatch(setEditCourse(true));
  }

  const goToNext = (e) => {
       
  }
  
  const cancelEdit = () => {
      setValue("sectionName" , "");
      setEditSectionName(null);
  }
  const handleEditSectionName = (sectionId , sectionName) => {
        if(sectionId === editSectionName){  // dont click on the same edit 
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName" , sectionName);
  }



  return (
       <div className='space-y-8 rounded-md border-[1px] bg-soft-gray border-soft-gray p-6'>
          <p className="text-2xl font-semibold text-black">Course Builder</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
             <div className='flex flex-col space-y-2'>

             </div>
                <label className='text-sm text-black' htmlFor='sectionName'>
                    Section Name  <sup className='text-sm text-pink-700'>*</sup>
                </label>

                <input
                  id='sectionName'
                  {...register('sectionName' ,  {required:true})}
                  placeholder='Add a section to build your course'
                  className="form-style w-full"
                  disabled= {loading}
                />
                {
                  errors.sectionName && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                          Section name is required
                    </span>
                  )
                }

                <IconBtn
                  type='submit'
                  disabled={loading}
                  text= {editSectionName ? "Edit Section" : "Create Section"}
                  // outline= {true}
                >
                  <IoAddCircleOutline size={20} className="text-yellow-50" />
                </IconBtn>
                
                {/* if edit section name is there then add the canceling functionality  */}
                {
                  editSectionName && (
                    <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
                  )
                }
          </form>

          {/* now if your coursecontent(section) are more than 0 then shouw me a nested view for that*/}
          {/* nested view contains alot of things here from editing to creating subsection */}
          {/* also you can edit the section also from there */}

          {
            course?.courseContent.length > 0 && 
            (<NestedView handleEditSectionName = {handleEditSectionName}  />)   //handleEditSectionName is left to be passON 

          }



          <div className='flex justify-end gap-x-3'>
              <button 
              onClick={goBack}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                    back
              </button>
              <IconBtn disabled={loading} text={"Next"} onclick={goToNext}>
              <MdNavigateNext />
              </IconBtn>
           
          </div>
       </div>
  )
}

export default CourseBuilder