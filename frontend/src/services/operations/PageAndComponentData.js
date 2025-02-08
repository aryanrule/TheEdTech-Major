import { toast } from "react-hot-toast"
import { categoriesEndPoints } from "../api";
import { ApiConnector } from "../apiConnector";


export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("loading....");
    let result = [];

    try{
        // console.log("categoty_page_Api" , categoriesEndPoints.CATEGORY_PAGE_DETAIL);
        const response = await ApiConnector("POST", categoriesEndPoints.CATEGORY_PAGE_DETAIL , {categoryId:categoryId}); //dont need token here 
        console.log(response);

        if(!response?.data?.success){
          throw new Error("Could Not Fetch Catagory page data.")

        }

        result = response?.data;
        console.log(result);
        
        
    }catch(e){
        console.log("CATALOGPAGEDATA_API API ERROR............", e);
        // toast.error(e.message);
    }
    toast.dismiss(toastId);
    return result;
}