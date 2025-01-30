import { categoriesEndPoints } from "../api";
import { ApiConnector } from "../apiConnector";

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


