const BASE_URL =  import.meta.env.VITE_REACT_APP_BASEURL;


/* defining some end points of the project */


export const categoriesEndPoints =  {
    CATEGORIES_API : BASE_URL + '/Courses/getAllCategories',
    CATEGORY_PAGE_DETAIL : BASE_URL + '/Courses/getCategoryPageDetails'
}


//Auth endpoints 
export const authEndPoints = {
   SEND_OTP_API : BASE_URL + '/auth/sendOTP' ,  
   SIGN_UP_API:BASE_URL + '/auth/signUp' ,   
   LOGIN_UP_API:BASE_URL+ '/auth/login' , 
   CHECK_USER_API:BASE_URL + '/auth/checkuser'
   
} 

export const SettingsEndPoints = {
    UPDATE_PROFILE_PICTURE : BASE_URL + '/Profile/updateProfilePicture' ,
    UPDATE_PROFILE : BASE_URL + '/Profile/updateProfile' ,  
    DELETE_ACCOUNT : BASE_URL + '/Profile/deleteAccount' , 

}

export const CourseEndpoints = {

    CREATE_COURSE : BASE_URL + '/Courses/createCourse' ,
    CREATE_SECTION : BASE_URL + '/Courses/addSection',
    EDIT_COURSE : BASE_URL + '/Courses/editCourse' , 
    CREATE_SECTION : BASE_URL + '/Courses/addSection' , 
    UPDATE_SECTION : BASE_URL + '/Courses/updateSection' , 
    DELETE_SECTION : BASE_URL + '/Courses/deleteSection' , 
    CREATE_SUBSECTION : BASE_URL + '/Courses/addSubsection' , 
    FIND_INSTRUCTORS_COURSE : BASE_URL + '/Courses/instructorCourse' , 
    DELETE_COURSE : BASE_URL + '/Courses/deleteCourse' ,
    FULL_COURSE_DETAILS : BASE_URL + '/Courses/getFullCourseDetails'  , 
    COURSE_DETAILS : BASE_URL + '/Courses/courseDetails'

    
}


