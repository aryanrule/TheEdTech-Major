import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { getFullCourseDetails } from '../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setEditCourse } from '../../slices/courseSlice';
import { setCourse } from '../../slices/courseSlice';
import RenderStep from '../Core/AddCourse/RenderStep';
const EditCourse = () => {
  const {courseId} = useParams();
  const [loading , setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);

  const dispatch = useDispatch();
  useEffect(() => {
    //callback 
    const fullDetails = async () => {
       setLoading(true);
       const response = await getFullCourseDetails(courseId , token);
       console.log(response);
       if(response){
         dispatch(setEditCourse(true));
         dispatch(setCourse(response?.courseDetails));
       }
       setLoading(false);
    }
    
    fullDetails();
    // console.log(courseId);
  } , []);
  

  return (
    <div>
       <h1 className="mb-14 text-3xl font-medium text-black">
        Edit Course
      </h1>
      
      <div className="mx-auto max-w-[600px]">
      {
        course ? (<RenderStep/>) : (<p  className="mt-14 text-center text-3xl font-semibold text-black">no course found</p>)
      }
      </div>

      
   
    </div>
  )
}

export default EditCourse