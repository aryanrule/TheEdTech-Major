import React, { useEffect, useState } from 'react'
import IconBtn from '../../Common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { FindInstructorCourse } from '../../../services/operations/courseDetailsAPI';
import CourseTable from '../InstructorCourse.jsx/CourseTable';

const MyCourses = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);


  const [courses , setCourses] = useState(null);
  
  useEffect(() => {
       const fetchCourses = async () => {
           const response = await FindInstructorCourse(token);
           if(response){
              setCourses(response);
           }
            console.log("this are actually courses" , courses);
       } 

       fetchCourses();

  } , []);

  return (
    <div>
       <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl font-medium text-black">My Courses</h1>
          <IconBtn
           text = "Add Course"
           onclick={() => navigate('/dashboard/add-course')}>
           
             <VscAdd/>

          </IconBtn>
       </div>
       
      {/* sending setCourse bcs later on if i needs to  */}
      {courses && <CourseTable courses = {courses} setCourses = {setCourses}/> }
       
      
    </div>
  )
}

export default MyCourses