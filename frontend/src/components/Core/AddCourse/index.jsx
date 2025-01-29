import RenderStep from "./RenderStep"
import { Link } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5";

export default function AddCourses() {
      
      return (
      <>
      <div className="flex justify-between gap-[100px]">
        <div className="flex flex-1 flex-col gap-8">
        
           <Link to='/dashboard/my-profile'>
                   <div className='flex item-center gap-2'> 
                        <span className="mt-1"> <IoChevronBack/> </span>  Back to myProfile
                   </div>
            </Link>
          <div className="flex flex-col">
            <RenderStep />
          </div>
        </div>

        {/* Course Upload Tips */}
        
        <div className="sticky top-10 max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
        <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.;
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
      </>)
}