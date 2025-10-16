import React from "react";
import { MdFactCheck } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse/PublishCourse";

const RenderStep = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center ">
        {steps.map((item) => (
            <>
            <div className="flex flex-col items-center" key={item.id}>
              <button
                className={`grid cursor-default aspect-square w-[60px] place-items-center rounded-full border-[4px]
                    ${
                      step === item.id
                        ? "border-mango-green text-mango-green"
                        : "border-richblack-700 bg-dark-green text-richblack-300"
                    }
                         ${step > item.id && "bg-mango-green "} `}
              >
                {step > item.id ? <FaCheck className="text-yellow-5"/> : item.id}
              </button>
            </div>
            
            {/* for the third step dont make this loading line  */}
            {item.id !== steps.length && (
              <>
                <div
                   key = {item.id}
                    className={`h-[calc(34px/2)] w-[33%] mt-[8px]  border-dashed border-b-4 ${
                    step > item.id ? "border-dark-green" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
            </>          
           
        ))}
      </div>


 
      <div className="relative mb-2 flex w-full  justify-between "> 
         {
            steps.map((item) => (
                <div 
                className={`text-center m-[3px] ${item.id === 2 ? "mr-[40px]" : ""} ${item.id === 3 ? "mr-[40px]" : ""} `}
                key={item.id}>
                    <p 
                    className={`text-md ${step >= item.id ? "text-mango-green": "text-black"}`}
                    >{item.title}</p>
                </div>
            ))
         }
      </div>

      {/* rendering the next three components based on step*/}
      {step === 1 && <CourseInformation/>}
      {step === 2 && <CourseBuilder/>}
      {step === 3 && <PublishCourse/>}
    </>
  );
};


export default RenderStep;
