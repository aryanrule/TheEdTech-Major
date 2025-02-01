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