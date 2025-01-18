import { ACCOUNT_TYPE } from "../utils/constant";

export const sidebarLinks = [
    {
       id : 1 , 
       name : 'My Profile' , 
       path : '/dashboard/my-profile' , 
       icon : "VscAccount" ,   
       // for everyone thats why no route id here 
    } ,
    {
        id:2 , 
        name : 'Enrolled Courses'  , 
        path : '/dashboard/enrolled-courses' , 
        type: ACCOUNT_TYPE.STUDENT , // only valid for student
        icon:'VscMortarBoard' , 
    }  , 
    
] 

