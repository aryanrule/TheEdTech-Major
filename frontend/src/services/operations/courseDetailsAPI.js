import { categoriesEndPoints } from "../api";
import { ApiConnector } from "../apiConnector";
import { toast } from "react-hot-toast"
import { CourseEndpoints } from "../api";
// A FUNCTION WHICH FETCHES ALL THE CATEGORIES AVAILAIBLE THERE TO BUILD A COURSE 



export const fetchAllCategories = async () => {
    let result = [];
    try{
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
       const toastId = toast.loading("Updating....")
       let result = null;
       try {
            console.log(CourseEndpoints.EDIT_COURSE);
            const response = await ApiConnector("POST" , CourseEndpoints.EDIT_SECTION , formdata ,  {
                 Authorization : `Bearer ${token}`
            });
            console.log(response);
            

       }catch(error){
          console.log(error);
          toast.error("error");
       }
       toast.dismiss(toastId);

}


