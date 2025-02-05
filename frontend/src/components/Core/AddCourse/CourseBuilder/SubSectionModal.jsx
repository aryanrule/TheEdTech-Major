import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import IconBtn from '../../../Common/IconBtn'
import Upload from '../Upload';
import { CreateSubSection } from '../../../../services/operations/courseDetailsAPI';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../slices/courseSlice';


const SubSectionModal = ({
    add = false , // if not passed 
    view = false , 
    edit = false , 
    modalData ,  // section Id whiling adding , // complete subsection in case of viewing   , //
    setModalData , 
    
    
}) => {

  
 
  
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const dispacth = useDispatch();

  const [loading  , setLoading] = useState(false);
  const {
    register , 
    setValue , 
    getValues , 
    handleSubmit , 
    formState : {errors} , 
  } = useForm();


  useEffect(() => {
     setValue("lectureTitle" , modalData.title);
     setValue("lectureDesc" , modalData.description);


  } , []);

  const onSubmit  =  async (data) => {
      if(view) return;

      if(edit){
         
      }
      else {  // if add mode addsection mode definately 
          const formData = new FormData();
          formData.append("SectionId" , modalData);
          formData.append("title" , data.lectureTitle);
          formData.append("VideoFile" , data.lectureUpload);
          formData.append("description" , data.lectureDesc);
          
          
          setLoading(true);
          const updatedSection = await CreateSubSection(formData , token);  // this is the section which is comming after updattion of subsection 
          console.log(updatedSection);
          console.log(course);
         
          if(updatedSection){
            // const updatedCourse = course.courseContent.map((section) => 
            //     section._id === modalData ? updatedSection = section 
            // ) 

            const updatedCourse = course.courseContent.map((section) => 
                section._id === modalData ? updatedSection : section
            );

            const updateCourseDetails = {...course , courseContent : updatedCourse};
            dispacth(setCourse(updateCourseDetails));
            console.log(course);
          }
          // now the task is to actually update your course also 
          // we can also update it with backend  but i am gona update it here 
          

          setLoading(false);  
          setModalData(null);

      }


  }
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-mango-green bg-opacity-10 backdrop-blur-sm'>
       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
         <p className="text-xl font-semibold text-white">
            hii every body
         </p>

         <button 
             onClick={() => {!loading ? setModalData(null) : {}}}>
            <RxCross2 className="text-2xl text-white"/>
         </button>
         </div>
          

         <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10">

          {/* Uploadation */}
          <Upload
            name = "lectureUpload"
            label = "Upload your lecture"
            register={register} 
            getValues= {getValues}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
        
          />


          {/* Lecture title */}
          <div className="flex flex-col space-y-2">
              <label className='text-sm text-white' htmlFor='lectureTitle'>Lecture Title</label>
              <input
                placeholder='Enter Lecture Title'
                className="form-style w-full"
                disabled={loading || view}
                {...register("lectureTitle" , {required:true})}
                id='lectureTitle'
              />
          </div>
          {
            errors.lectureTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )
          }

          {/* Lecture Description */}
          

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-white"  htmlFor='lectureDesc'>Lecture Description</label>
            
              <textarea
              className="form-style resize-x-none min-h-[130px] w-full"
              placeholder='Enter Lecture Description'
              disabled={loading || view}
              {...register("lectureDesc", {required:true})}
              id='lectureDesc'
               />
          </div>
          {
            errors.lectureDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )
          }

          

          {
           //if you are on a viewMode then dont add any button to submit
            !view && (
            <div  className="flex justify-end">
            <IconBtn
              
              disabled = {loading}
              text = {loading ? "loading..." : edit ? "Save changes" : "Save"} />
            </div>
            )
          }
         </form>



       </div>
    </div>
  )
}

export default SubSectionModal