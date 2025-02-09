import { categoriesEndPoints } from "../api";
import { ApiConnector } from "../apiConnector";
import { toast } from "react-hot-toast"
import { CourseEndpoints } from "../api";
import { IoTrophySharp } from "react-icons/io5";
// A FUNCTION WHICH FETCHES ALL THE CATEGORIES AVAILAIBLE THERE TO BUILD A COURSE 

export const fetchAllCategories = async () => {
    let result = [];
    try{
       console.log(categoriesEndPoints.CATEGORIES_API);
       const response = await ApiConnector("GET" , categoriesEndPoints.CATEGORIES_API);
       if(!response?.data?.success){
         throw new Error(response.data.message);
       }
       result = response.data.AllCategories;
       // this will actually gona return an object further you can take the values of categories out there in your usecase
       console.log("this is the result" , result);
       
       
    }catch(error){
       console.log("there is an error which fetching the CATEGORY_API" , error);
       toast.error(error.message);

    }
    return result;
}


// A FUNCTION WHICH LETS YOU CREATE THE COURSE 
export const addCourseDetails = async (data , token) => {
       let result = null;
       const toastId = toast.loading("Creating course...");
    
       try{
          const response = await ApiConnector("POST" , CourseEndpoints.CREATE_COURSE , data  , {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }); // yha fatt rhi hai 
          
          if(!response?.data?.success){
            throw new Error("Could Not add  Course Details");
          }
          toast.success("Course Details Added Successfully");
          result = response?.data?.data;
       }catch(error){ 
        console.log("NOT ABLE TO HIT ADDCOURSE API" , error);
       }
       toast.dismiss(toastId);
       return result;
}

export const FindInstructorCourse = async (token) => {
      let result = [] ;
      const toastId = toast.loading("loading..."); 
      try{
          // console.log(CourseEndpoints.FIND_INSTRUCTORS_COURSE);
          
          const response = await ApiConnector("GET", CourseEndpoints.FIND_INSTRUCTORS_COURSE , null ,  {  // you have to pass data as null it will be syntaxual issue then if not passed null 
            Authorization : `Bearer ${token}`
         });

         
         if(!response?.data?.success){
            throw new Error("error in course fetching of instrcutor");
         }
         console.log(response);
         result = response?.data?.data;
         
        //  console.log(result);
        
      }catch(error){
        console.log("there is a error while fetching the instructor course" , error);
      }
      toast.dismiss(toastId);
      return result;

}

export const createSection = async (value,token) => {
       let result = null;
       const toastId = toast.loading("creating section...");
       try { 
         
         console.log("this is the addSection api" , CourseEndpoints.CREATE_SECTION);

         const response = await ApiConnector("POST" , CourseEndpoints.CREATE_SECTION , value , {
            Authorization : `Bearer ${token}`
         })

         if(!response?.data?.success){
            throw new Error("cannot create a course");
         }
         
         result = response?.data?.data;   // this is basically the update course with addes course here 
         console.log("result" , result);
         toast.success("Section Created successfully");
         console.log(response);

       }catch(error){
          console.log("there is an issue while hitting the create Section api here" , error);
          toast.error("errorr");
       } 
       toast.dismiss(toastId);
       return result;


}

export const updateSection = async (data , token ) => {
    const toastId = toast.loading("updating SectionName");
    let result = null;
    try {
        console.log("update section api" , CourseEndpoints.UPDATE_SECTION);
        const response = await ApiConnector("POST" , CourseEndpoints.UPDATE_SECTION , data , {
            Authorization : `Bearer ${token}` , 
        }) ;
        

        if(!response?.data?.success){
            throw new Error("not able to update the section");
        } 
        
        result = response?.data?.data;

        toast.success("section updated succesfully");
        
    }catch(error){
        console.log(error);
        toast.error("erorr");
    }
    toast.dismiss(toastId);
    return result;

}

export const deleteSection = async(data , token) => {
      const toastId = toast.loading("deleting section");
      let result = null;
      try{
          console.log(CourseEndpoints.DELETE_SECTION);
          const response = await ApiConnector("POST", CourseEndpoints.DELETE_SECTION , data , {
            Authorization : `Bearer ${token}` , 
          })
          
          if(!response?.data?.success){
            throw new Error("not able to delete the section");

          }
          result = response?.data?.data;
        //   console.log(response);
          toast.success("Section de;eted successfully");

      }catch(error){
        toast.error("section couldnt delete");
        console.log(error);
      }
      
      toast.dismiss(toastId);
      return result;
}

export const updateCourseDetails = async (formdata , token) => {
       let result = null;
       const toastId = toast.loading("updating...");
       try{
          console.log(CourseEndpoints.EDIT_COURSE)
          const response = await ApiConnector("POST", CourseEndpoints.EDIT_COURSE , formdata , {
            Authorization : `Bearer ${token}` , 
          })
          if(!response?.data?.success){
            throw new Error("not able to delete the section");

          }
          console.log(response);
          result = response?.data?.updatedCourse;
          toast.success("Updation has been done");
       }catch(error){
          console.log("error in hitting the update Course details", error);
          toast.error("error");
       }
      
       toast.dismiss(toastId);
       return result;
}


export const CreateSubSection = async (formdata , token) => {
       const toastId = toast.loading("creating subsection");
       let result = null ;
       try {
          const response = await ApiConnector("POST" , CourseEndpoints.CREATE_SUBSECTION , formdata  , {
            Authorization : `Bearer ${token}`
             
          });
          
          // response will give you a section which is now updated with a  subsection 
          if(!response?.data?.succcess){
            throw new Error("not able to delete the section");
               
          }
          result = response?.data?.UpdatedSection;
          toast.success("Lecture Added SUccesfully");
        
       }catch(error){
        console.log(error);
        toast.error("error");
       }

       toast.dismiss(toastId);
       return result;
}



export const deleteCourse = async (courseId , token) => {
     const toastId = toast.loading("deleting...");

    //  let response = false;
     try {
          const response = ApiConnector("POST" , CourseEndpoints.DELETE_COURSE , courseId , {
            Authorization : `Bearer ${token}` , 
          })

          if(!response?.data?.success){
             throw new Error("coudnt delete the course");
            
          }
         
          toast.success("course Deleted successFully");

      }catch(error){
        console.log(error);
        toast.error("error");
      }
      toast.dismiss(toastId)
}

export const getFullCourseDetails = async (courseId , token)=> {
    const toastId = toast.loading("deleting...");
    let result = null;
     try{
        // console.log('hello gandupppppp');
        const response = await  ApiConnector("POST" , CourseEndpoints.FULL_COURSE_DETAILS , {courseId} , {
          Authorization : `Bearer ${token}` , 
        });
        if(!response?.data?.success){
          throw new Error("coudn't get the full details of course");
       }
       console.log(response);

       result = response?.data?.data; 
       
        // console.log(response);
        
     }catch(error){
      console.log(error);
      toast.error("error");
      result = error.response.data

     }
     toast.dismiss(toastId)
     return result;
}


export const FetchcourseDetails = async (courseId) => {
     const toastId = toast.loading("Loading...")  
     let result = null;
     try {
        const response = await ApiConnector("POST" ,  CourseEndpoints.COURSE_DETAILS , {courseId}); // dont need token 
        // console.log(response);
        // console.log(response.data.success);
        if(!response.data.success){
          throw new Error("coudn't get the full details of course");
        }

        result = response?.data;
        // now result contains a full object of courseDetails and also it contains the time duration
        
     }catch(error){
      console.log(error);
      toast.error("error");
      result = error.response.data
     }
     toast.dismiss(toastId)
     return result;
}
