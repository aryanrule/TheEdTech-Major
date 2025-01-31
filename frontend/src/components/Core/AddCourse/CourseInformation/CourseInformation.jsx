import React, { useEffect, useState } from 'react'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { useForm } from 'react-hook-form';
import ChipInput from './ChipInput';
import { useSelector } from 'react-redux';
import { categoriesEndPoints } from '../../../../services/api';
import { ApiConnector } from '../../../../services/apiConnector';
import { fetchAllCategories } from '../../../../services/operations/courseDetailsAPI';
import Upload from '../Upload';
import Requirements from './Requirements';


const CourseInformation = () => {
  
  const {editCourse , course} = useSelector((state) => state.course);
  const [courseCategory  , setCourseCategories] = useState([]);
  const [loading  , setLoading] = useState(false);
  //step-1 get all the categories out there available 


  useEffect(() => {
      const getAllCategories = async () => { 
          setLoading(true);
           
          const Category = await fetchAllCategories();
          console.log("response of all categories" , Category);
          if(Category.length > 0 ){
            setCourseCategories(Category);
          }
          setLoading(false);
          // 1st way to extract all the categories 
          // const categoryName = catResponse.map((item) => item.name);
          // console.log("categoru name" , categoryName);
          // setCourseCategories(categoryName);
           
          
          // 2nd way to extract all the categories
          // alternative methods are also there but i made it for some learning experince  
          // setCourseCategories((prevCat) => [
          //   ...prevCat , 
          //   ...catResponse.map((item) => item.name)  
          // ])
          // ONE BUG ENCOUNTERED HERE IF EVERYTIME USEEFFECT HOOK CALLS THEN YOU HAVE TO UNDERSTAND THAT STATE UPDATES WITH DUPLICATE VALUE

         
      }

      // one more thing is leftover here 
      // PENDING AND YOU NEED TO FIND WHAT IF THE CODE WORKS ON EDIT MODE 
      // PENDING .........

      
      getAllCategories();
  } , []);



  // IS FORMUDATED PENDING 
   

  const onSubmit = async (data)=> {
    console.log(data);

  } 


  

  const {
    register , 
    handleSubmit , 
    setValue ,   // kind of setting the state of the dom element 
    getValues ,  // kind of getting the current  state of the dom elements 
    formState : {errors}  , 
  } = useForm();


  

  return (
     <form  className='rounded-md border-[1px]  border-yellow-400 p-6 bg-soft-gray space-y-8'>
        <div className='flex flex-col space-y-2'>
            <label className='text-sm text-black' htmlFor='courseTitle'>Course Title <sup className='text-pink-700 text-md'>*</sup> </label>
            <input
              id='courseTitle' 
              placeholder='Enter you title here'
              {...register("courseTitle" , {required : true})}
              className='form-style w-full'
            />
        </div>
        {
          errors.courseTitle && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Course title is required 
            </span>
          ) 
        }
        
        <div className='flex flex-col space-y-2'>
            <label className='text-sm text-black' htmlFor='courseShortDesc'>Course Short Description<sup className='text-pink-700 text-md'>*</sup> </label>
            <textarea
              id='courseShortDesc' 
              placeholder='Enter you description'
              {...register("courseShortDesc" , {required:true})}
              className='form-style resize-x-none min-h-[130px] w-full'
            />
        </div>
        {
          errors.courseShortDesc && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Course description is required
            </span>
          )
        }

        <div className=' flex flex-col space-y-2 relative'>
          <label className='text-sm text-black' htmlFor='coursePrice'>Price <sup className='text-pink-700 text-md'>*</sup></label>
          <input
             id='coursePrice'
             placeholder='enter Price'
             {...register("coursePrice" , {required:true})}
             className='form-style  w-full !pl-10 '             
           />
          <HiOutlineCurrencyRupee className='absolute top-8 w-[40px] h-[30px] translate-x-[0px]  '/>
        </div>  
        {
          errors.coursePrice && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                Course Price is required
            </span>
          )
        }

         
         {/* this is to select amoungs all the category */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-black' htmlFor='courseCategory'>Category <sup className='text-pink-700 text-md'>*</sup> </label>
          <select
          defaultValue=""
           className='form-style w-full'
           id='courseCategory'
           {...register("courseCategory" , {required:true})}
           >

            <option value="" disabled selected>
                choose a category
            </option>

            {
              !loading  && 
                courseCategory.map((obj, index) => (
                     <option key = {index} >
                         {obj.name}                           
                     </option>
                ))
              
            }

          </select>
        </div>
        {
          errors.courseCategory && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                courseCategory is required 
            </span>
          )
        }

         {/*now the next thing is here is the chipinput in which all the tags associated with the courses are available  */}
        <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

        {/* file uploadation or thumbnail uploadation based on editcourse or while creating a course*/}
        <Upload
          label="CourseImage"
          name= "Course Thumbnail"
          register = {register}
          setValue={setValue}
          errors = {errors}
          editData = {editCourse ? course.thumbnail : null}
        />

        {/* creating a requirement field */}
        <div className='flex flex-col space-y-2'>
             <label className='text-sm text-black' htmlFor='courseBenefits'>Benefits of Course  <sup className='text-pink-700 text-md'>*</sup></label>
               
             <textarea
               {...register("courseBenefits"  , {required:true})}
               placeholder='Enter Benefits of Course'
               className='form-style resize-x-none min-h-[130px] w-full'
              id='courseBenefits'
             />
        </div>
        {
          errors.courseBenefits && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                 courseBenefits is required 
            </span>
          )
        }


        {/* here comes the requiresments or the instructions this is similar to tags */}
        <Requirements
          name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}

        />
     </form>
  )
}

export default CourseInformation