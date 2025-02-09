import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Course_card = ({course , Height}) => {
  
    useEffect(() => {
        console.log(course);
    } , []);
 
  return (
    <>
        <Link to = {`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                      <img 
                        src = {course?.thumbnail}
                        alt="course thumnail"
                        className={`${Height} w-full rounded-xl object-cover `}
                      />
                </div>

                <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-black">{course?.courseName}</p>
                        <p className="text-sm text-black">
                           {course?.instructor?.firstName} {course?.instructor?.lastName} 
                        </p>

                        {/* RATING ON THE COURSE IS PENDING*/}
                        
                </div>
            </div>
        </Link>
    </>
  )
}

export default Course_card