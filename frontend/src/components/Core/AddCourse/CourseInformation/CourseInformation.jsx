import React, { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import ChipInput from "./ChipInput";
import { useDispatch, useSelector } from "react-redux";
import { categoriesEndPoints } from "../../../../services/api";
import { ApiConnector } from "../../../../services/apiConnector";
import { fetchAllCategories, updateCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import Upload from "../Upload";
import Requirements from "./Requirements";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";
import IconBtn from "../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md"
import { STATUS } from "../../../../utils/constant";
import { addCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";

/*
  CASE -1 WHEN YOU ARE IN YOUR EDITCOUSE MODE 
  CASE -2 WHEN YOU ARE NOT IN YOUR EDITCOURSE MODE 
*/

const CourseInformation = () => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [courseCategory, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  //step-1 get all the categories out there available

  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);

      const Category = await fetchAllCategories();
      if (Category.length > 0) {
        setCourseCategories(Category);
      }
      setLoading(false);
      console.log(course);
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
    };

    // one more thing is leftover here
    // PENDING AND YOU NEED TO FIND WHAT IF THE CODE WORKS ON EDIT MODE
    // PENDING .........

    
    // if edit course is true then hundred percent there will be course also there 
    // all the values will be reflected to the corresponding fields
    if(editCourse){
      setValue("courseTitle" , course.courseName);
      setValue("courseShortDesc" , course.courseDescription);
      setValue("coursePrice" , course.price);
      setValue("courseCategory" , course.category);
      setValue("courseTags" ,course.tag);
      setValue("courseImage" , course.thumbnail);
      setValue("courseBenefits" , course.whatYouWillLearn);
      setValue("courseRequirements" , course.instructions);
    }
    
    getAllCategories();
  }, []);
  
  
  const isFormUpdated = () => {
        const currentValues = getValues();
        if(
          currentValues.courseTitle !== course?.courseName  ||
          currentValues.courseShortDesc !== course?.courseDescription ||
          currentValues.coursePrice !== course?.price ||
          currentValues.courseTag !== course?.tag ||
          currentValues.courseImage !== course?.thumbnail ||
          currentValues.courseRequirements !== course?.instructor ||
          currentValues.courseCategory !== course?.category   ||
          currentValues.courseBenefits !== course?.whatYouWillLearn 
        ){
          return true ;
        }
        else{
            return false ; // nothing is updated 
        }
  }

  const onSubmit = async (data) => { 
    //  IF YOU ARE IN EDIT MODE AND THEN CALL THE EDITCOURSE API BUT FIRST VALIDATE ISFORMUPDATED
    
    // ELSE SIMPLY CALL YOU CREATECOURSE API 
       
     // REEVALUATION AFTER SOME TIME -------------------------------------------------------VERY IMPORTANT 
     if(editCourse){

         if(isFormUpdated()){  // means there are some changes in your edit course mode 
          const currentValues = getValues();
          const formdata = new FormData();
          
          formdata.append("courseId" , course._id);
          if(currentValues.courseTitle !== course.courseName){
            formdata.append("courseName" , data.courseTitle);
          }
          if(currentValues.courseShortDesc !== course.courseDescription){
            formdata.append("courseDescription" , data.courseShortDesc);
          }
          if(currentValues.coursePrice !== data.price){
            formdata.append("price" , data.coursePrice);
          }
          if(currentValues.courseTags.toString() !== course.tag.toString()){
            formdata.append("tag" , JSON.stringify(data.courseTags));    
          }
          if(currentValues.courseImage !== course.thumbnail){
            formdata.append("thumbnail" , data.courseThumbnail);  
          }
          if(currentValues.category !== course.category){
            formdata.append("category" , data.courseCategory);
          }
          if(currentValues.courseBenefits !== course.whatYouWillLearn){
            formdata.append("whatYouwillLearn" , data.courseBenefits);
          }
          if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
            formdata.append("instructions" , JSON.stringify(data.courseRequirements));
          }

          // its time to update this 
          formdata.forEach((value, key) => {
            console.log(key, value);
           });
          setLoading(true);
          await updateCourseDetails(formdata , token);
          setLoading(false);

         }
          
        
     }
     else {
            
      console.log(data); // everythings works fine here 
      const formdata = new FormData();
      formdata.append("courseName" , data.courseTitle);
      formdata.append("courseDescription" , data.courseShortDesc);
      formdata.append("price" , data.coursePrice);
      formdata.append("tag" , JSON.stringify(data.courseTags));
      formdata.append("thumbnail" , data.courseThumbnail);
      formdata.append("instructions" , JSON.stringify(data.courseRequirements));
      formdata.append("category" , data.courseCategory);
      formdata.append("whatYouwillLearn"  , data.courseBenefits);
      formdata.append("status" , STATUS.DRAFT);
      // for(const pair of formdata.entries()){
      //   console.log(pair[0] , pair[1]);
      // }
      // console.log([...formdata.entries()]);
      // formdata.forEach((key , value) => {
      //   console.log(key , value);
      // })


      setLoading(true);
      const result = await addCourseDetails(formdata , token);
      if(result){
         dispatch(setCourse(result));  // now at present this is my course
         dispatch(setStep(2));
      }
      console.log(result);
      setLoading(false);
      
     }
     
     
  };

  
  


  const {
    register,
    handleSubmit,
    setValue, // kind of setting the state of the dom element
    getValues, // kind of getting the current  state of the dom elements
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-[1px]  border-yellow-400 p-6 bg-soft-gray space-y-8"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseTitle">
          Course Title <sup className="text-pink-700 text-md">*</sup>{" "}
        </label>
        <input
          id="courseTitle"
          placeholder="Enter you title here"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
      </div>
      {errors.courseTitle && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course title is required
        </span>
      )}

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseShortDesc">
          Course Short Description<sup className="text-pink-700 text-md">*</sup>{" "}
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter you description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
      </div>
      {errors.courseShortDesc && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course description is required
        </span>
      )}

      <div className=" flex flex-col space-y-2 relative">
        <label className="text-sm text-black" htmlFor="coursePrice">
          Price <sup className="text-pink-700 text-md">*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="enter Price"
          {...register("coursePrice", { 
            required: true , 
            valueAsNumber:true , 
            pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
             })}
          className="form-style  w-full !pl-10 "
        />
        <HiOutlineCurrencyRupee className="absolute top-8 w-[40px] h-[30px] translate-x-[0px]  " />
      </div>
      {errors.coursePrice && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course Price is required
        </span>
      )}

      {/* this is to select amoungs all the category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseCategory">
          Category <sup className="text-pink-700 text-md">*</sup>{" "}
        </label>
        <select
          defaultValue=""
          className="form-style w-full"
          id="courseCategory"
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled selected>
            choose a category
          </option>

          {!loading &&
            courseCategory.map((obj, index) => (
              <option key={index}>{obj.name}</option>
            ))}
        </select>
      </div>
      {errors.courseCategory && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          courseCategory is required
        </span>
      )}

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
        label="courseImage"
        name="courseThumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course.thumbnail : null}
      />

      {/* creating a requirement field */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-black" htmlFor="courseBenefits">
          Benefits of Course <sup className="text-pink-700 text-md">*</sup>
        </label>

        <textarea
          {...register("courseBenefits" , {required:true})}
          placeholder="Enter Benefits of Course"
          className="form-style resize-x-none min-h-[130px] w-full"
          id="courseBenefits"
        />
      </div>
      {errors.courseBenefits && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          courseBenefits is required
        </span>
      )}

      {/* here comes the requiresments or the instructions this is similar to tags */}
      <Requirements
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* next button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={(e) => dispatch(setStep(2))}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}

        <IconBtn
          disabled={loading}
          text = {editCourse ? "Save Changes" : "next"}
        >
            <MdNavigateNext/>
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformation;
