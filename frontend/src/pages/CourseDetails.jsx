import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchcourseDetails } from "../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { formateDate } from "../services/formateDate";
import CourseDetailsCard from "../components/Core/Course/CourseDetailsCard";
import ReactMarkdown from "react-markdown";
import CourseAccordianBar from "../components/Core/Course/CourseAccordianBar";
import ConfirmmationModal from "../Dashboard/ConfirmmationModal";


const CourseDetails = () => {
  // you just need the courseId here to build this coponents
  const { courseId } = useParams();
  const [response, setResponse] = useState(null);
  const { loading } = useSelector((state) => state.profile);
  const [confirmationModal , setConfirmationModal]= useState(null);
  
  
  
  const [isActive , setIsActive] = useState(Array(0));


  const handleActive = (id) => {
      setIsActive( !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((ID) => ID != id));
      // if id is not there then add it else remove it
      // using this to toggle 

  }



  const getCourseDetails = async () => {
    try {
      const res = await FetchcourseDetails(courseId);
      //  console.log(res);
      if (res) {
        setResponse(res);
        console.log(res);
      }
    } catch (erorr) {
      console.log("coudnt fetch the details of this course", erorr);
    }
  };
  

  useEffect(() => {
    getCourseDetails();
    console.log(courseId);
  }, [courseId]);

  const [totalNumberOfLectures , setTotalNumberOfLectures] = useState(null);

  useEffect(() => {
     let lectures = 0;
     response?.data?.courseDetails?.courseContent?.forEach((sec)=> {
        lectures += sec.subSection.length || 0;
     });
     setTotalNumberOfLectures(lectures);
  },[response]);
  
  
  
  
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner">loading</div>
      </div>
    );
  }

  const {
    courseName,
    thumbnail,
    courseDescription,
    instructor,
    createdAt,
    price,
    whatYouWillLearn,
    courseContent
  } = response.data.courseDetails;

  return (
    <>
      <div className={`relative w-full bg-dark-green`}>
        {/* hero section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                {/* lot of rating and review part is levtover here */}
                <span className="text-yellow-25">staaaaarrrs</span>

                <span></span>
                <span></span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor?.firstName} ${instructor?.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formateDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton">Buy Now</button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Course Card component*/}
        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
          <CourseDetailsCard
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            // handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      {/* here is the entire sections amd subsections */}
      <div className="mx-auto box-content px-4 text-start  lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* what you will learn kind of a section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold text-black">
              What you'll learn
            </p>
            <div className="mt-5">
              <ReactMarkdown className={"text-black"}>
                {whatYouWillLearn}
              </ReactMarkdown>
            </div>
          </div>
          



          {/* course Content section  */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold text-black">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2 text-black">
                  <span>
                   {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                   {totalNumberOfLectures}  {`lecture(s)`}
                  </span>
                  <span>{response?.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-mango-green"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>


            {/* course detail dropdown or kind or accordian */}
            {/* left */}
            <div className="py-4">
               {
                courseContent.map((course,index) => (
                  <CourseAccordianBar 
                  key = {index}
                  course = {course}
                  isActive = {isActive}
                  handleActive = {handleActive}
                  />
                ))
               }
            </div>



            {/* Author details */}
            <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
         
               <div className="flex items-center gap-4 py-4">
               {/* leftover */}
               <img
                  src={
                    instructor?.image
                      ? instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName} ${instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
               <p className="text-lg">{`${instructor?.firstName} ${instructor?.lastName}`}</p>
               </div>


              <p className="text-black">
                {instructor?.additionalDetails?.about}
              </p>

            </div>
          </div>



        </div>
      </div>

      {/* footer leftover */}



      {/* confirmationModal */}
      {confirmationModal && <ConfirmmationModal modalData={confirmationModal}/>}
    </>
  );
};

export default CourseDetails;
