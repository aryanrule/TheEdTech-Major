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
    {
        id : 3  , 
        name : 'Cart' , 
        path : '/dashboard/cart' , 
        type:ACCOUNT_TYPE.STUDENT , 
        icon : 'VscArchive'
    } , 
    {
        id:4 , 
        name:'My Courses' , 
        path:'/dashboard/my-courses' , 
        type:ACCOUNT_TYPE.INSTRUCTOR , 
        icon:'VscVm' , 

    } , 
    {
        id : 5 , 
        name:'Add Courses' , 
        path:'/dashboard/add-course' , 
        type:ACCOUNT_TYPE.INSTRUCTOR , 
        icon :'VscAdd'
    }  , 
    {
    id: 6,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
    }
] 

