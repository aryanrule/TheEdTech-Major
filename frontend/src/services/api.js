const BASE_URL =  import.meta.env.VITE_REACT_APP_BASEURL;


/* defining some end points of the project */


export const categoriesEndPoints =  {
    CATEGORIES_API : BASE_URL + '/Courses/getAllCategories'  , 
}


//Auth endpoints 
export const authEndPoints = {
   SEND_OTP_API : BASE_URL + '/auth/sendOTP' ,  
   SIGN_UP_API:BASE_URL + '/auth/signUp' ,   
   LOGIN_UP_API:BASE_URL+ '/auth/login' , 
   CHECK_USER_API:BASE_URL + '/auth/checkuser'
   
} 