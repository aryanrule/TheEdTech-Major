import React, { useEffect, useState } from 'react'
import { setCourse, setStep } from '../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn';
import { useForm } from 'react-hook-form';
import { STATUS } from '../../../../utils/constant';
import { resetCourseStata } from '../../../../slices/courseSlice';
import { updateCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
/* the whole logic of this component is to make sure that you published the course as drafted or as publised  */
//  i wanted to add weather i wanetd to make my course publish or kept it as a draft 


const PublishCourse = () => {
  const {
    register , 
    setValue , 
    getValues , 
    handleSubmit 
  } = useForm();

  const navigate = useNavigate();
  const [loading , setLoading]= useState(false);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setStep(2));
  }


  useEffect(() => {
    if(course?.status === STATUS.PUBLISH){
      setValue("public" , true);
    }
  } , [course  , setValue]);
  
  const gotoCourses = () => {
    dispatch(resetCourseStata());
    navigate('/dashboard/my-courses');
  }
  

  const handleCoursePublish = async () => {
    //  dont make a call if the value is already equal to the value of status in the course 
    // why are you re updating and making a api call 
    if(course?.status === STATUS.PUBLISH && getValues("public") === true
      || course?.status === STATUS.DRAFT && getValues("public") === false){
             gotoCourses();
             return 
       }
    else {
      const formData = new FormData();
      formData.append("courseId", course._id);
      const courseStatus = getValues("public") ? STATUS.PUBLISH : STATUS.DRAFT;
      formData.append("status" , courseStatus);
      setLoading(true);
      const response = await updateCourseDetails(formData , token);
      if(response){
        dispatch(setCourse(response));
        gotoCourses();
         
      }
      setLoading(false);
    }


  }
  
  const onSubmit = (data) => {
        handleCoursePublish();
  }




  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
          <p className="text-2xl font-semibold text-richblack-5">
             Publish course
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6 mb-8">
                     <label className="inline-flex items-center text-lg" htmlFor='public'> 
                        <input
                          type='checkbox'
                          id='public'
                          className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                          {...register("public")}
                        />

                        <span className="ml-2 text-richblack-400">
                            Make this Course as public
                        </span>
                     </label>
                </div>


                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                    disabled = {loading}
                    type='button'
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                    Back
                    </button>

                    <IconBtn disabled={loading} text="Save Changes"/>
                </div>


                
          </form>
    </div>
  )
}

export default PublishCourse