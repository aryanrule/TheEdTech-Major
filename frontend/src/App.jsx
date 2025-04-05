import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Common/Navbar";
import InitialLoading from "./components/Core/HomePage/InitialLoading";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import { Route, Router, Routes } from "react-router-dom";
import ResetPass from "./pages/ResetPass";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/Core/Auth/OpenRoute";
import PrivateRoute from "./components/Core/Auth/PrivateRoute";
import Error from "./pages/Error";
import MyProfile from "./Dashboard/MyProfile";
import EnrolledCourses from "./Dashboard/EnrolledCourses";
import Settings from "./Dashboard/Settings";
import { useSelector } from "react-redux";
import AddCourses from "./components/Core/AddCourse";
import { ACCOUNT_TYPE } from "./utils/constant";
import MyCourses from "./components/Core/MyCourses/MyCourses";
import EditCourse from "./components/EditCourse.jsx";
import Catelog from "./pages/Catelog.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import AddToCart from "./pages/AddToCart.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { useEffect } from "react";


function App() {
  const {user} = useSelector((state) => state.profile);
  
  return (
    <div className="font-semibold  min-h-screen  w-screen  ">
      <Navbar /> 
      {/* <InitialLoading /> */}
       
       <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path ="/login" element = {<Login/>}/>
        <Route path ="/signUp" element = {<SignUp/>}/>
        
        <Route path ='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/catalog/:catelogName' element= {<Catelog/>}/>
        <Route path = "courses/:courseId" element = {<CourseDetails/>}/>



       
       {/* this are nested routes */}
        <Route 
         element = {
           <PrivateRoute>
               <Dashboard/>
               
           </PrivateRoute>
         }>

        <Route path = "dashboard/my-profile" element = {<MyProfile/>}/>
        <Route path = "dashboard/enrolled-courses" element = {<EnrolledCourses/>}/>
        <Route path = "dashboard/settings" element = {<Settings/>}/>
        
        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR  && (
          <>
          <Route path = 'dashboard/add-course' element={<AddCourses/>}/>
          <Route path='dashboard/my-courses' element = {<MyCourses/>}/>

          <Route path="dashboard/edit-course/:courseId" element= {<EditCourse/>}/>
          </>
        )}


        {/* routes only for student */}
        {user?.accountType === ACCOUNT_TYPE.STUDENT  && (
          <>
          <Route path = 'dashboard/enrolled-courses' element ={<EnrolledCourses/>}/>
          <Route path = 'dashboard/cart' element ={<AddToCart/>}/>
          </>
         
        )}



        </Route>
    
        <Route path = '*' element = {<Error/>}/>         
        </Routes>
        
    </div>
  );
}

export default App;



