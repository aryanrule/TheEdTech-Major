import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { formateDate } from '../../../services/formateDate'
import { STATUS } from '../../../utils/constant'
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ConfirmmationModal from '../../../Dashboard/ConfirmmationModal'
import { useSelector } from 'react-redux'
// import { response } from 'express'
import { FindInstructorCourse } from '../../../services/operations/courseDetailsAPI'
import { deleteCourse } from '../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'


const CourseTable = ({ courses, setCourses }) => {
  const [confirmationModal , setConfirmationModal] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const [loading , setLoading]  = useState(false);
  const navigate = useNavigate();  

  const handleDeleteCourse = async (courseId) => { 
        setLoading(true);
        await deleteCourse({courseId : courseId} , token);
        const result = await FindInstructorCourse(token);
        if(result){
           setCourses(result);    
        }
        setLoading(false);
        setConfirmationModal(null);
  }

  const TRUNCATE_LENGTH = 30
  return (
    <>
      <Table className="rounded-xl border border-richblack-800">
      <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                key={course._id}
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-black">
                      {course?.courseName}
                    </p>

                    <p className="text-xs text-richblack-300">
                      {course?.courseDescription?.length > TRUNCATE_LENGTH
                        ? course?.courseDescription.slice(0, TRUNCATE_LENGTH) + "..."
                        : course?.courseDescription}
                    </p>

                    <p className="text-[12px] text-mango-green">
                      Created: {formateDate(course?.createdAt)}
                    </p>

                    {course?.status === STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>

                <Td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Td>

                <Td className="text-sm font-medium text-richblack-100">
                  {course?.price}
                </Td>

                <Td className="text-sm font-medium text-richblack-100">
                  <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    >
                    <FiEdit2 size={20} />
                  </button>

                  <button
                   onClick={() => setConfirmationModal({
                       text1 : "Are You sure You Wanted to delete this course ?" , 
                       text2 : "Deleting this Course will Delete everything from it !"  ,
                       btn1Text : "Delete" , 
                       btn2Text : "Cancel" , 
                       btn1Handler : () => handleDeleteCourse(course._id),  
                       btn2Handler : () => setConfirmationModal(null) , 
                   })}
                   className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && (<ConfirmmationModal modalData = {confirmationModal}/>)}
    </>
  )
}

export default CourseTable
