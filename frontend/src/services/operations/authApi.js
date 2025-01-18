import {toast} from 'react-hot-toast';
import { authEndPoints } from '../api';
import {setLoading} from '../../slices/authSlice';
import { ApiConnector } from '../apiConnector';
import { setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';




 const {
    SEND_OTP_API , 
    SIGN_UP_API , 
    CHECK_USER_API , 
    LOGIN_UP_API  , 
} = authEndPoints;

 export function sendOTP (email , navigate){
   return async(dispatch) => {
      const toastId = toast.loading("Sending OTP");
      dispatch(setLoading(true));
      try{
          const Response = await ApiConnector("POST" ,SEND_OTP_API , {email});
          console.log("SendOTP Api Response" , Response);
          
          if(!Response.data.success){
             return new Error(Response.data.message);
          }

          toast.success("OTP Sent Successfully");
          navigate('/verify-email');

          
      }catch(e){
         console.log("cannot send otp" , e);
         toast.error("error");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
   }
 }
 
//  export function checkUser(email) {
//    return async (dispatch) => {
//        dispatch(setLoading(true));
//        try {
//            console.log("API Endpoint:", CHECK_USER_API);
//            console.log("Email Input:", email);

//            // API call to check user
//            const response = await ApiConnector("POST", CHECK_USER_API, { email });

//            if (response.data.message == "YES") {
//                console.log("User exists:", response.data.message);
//                return true; // User is present
//            } else {
//                console.log("User not found:", response.data.message);
//                return false; // User not present
//            }
//        } catch (e) {
//            console.log("Error checking user:", e);
//            return false; // Treat errors as user not found
//        } finally {
//            // Ensure loading state is turned off
//            dispatch(setLoading(false));
//        }
//    };
// }

  
 export function signUp(payload , navigate){
    //returning a redux thunk
    return  async(dispatch) => {
      const {accountType , email , firstName , lastName , password , confirmPassword} = payload;
      const otp = payload.OTPstring;
      console.log(otp);
      const toastId = toast.loading('Signing up ....');
      dispatch(setLoading(true));
      try{
           const Response = await ApiConnector("POST" , SIGN_UP_API , 
            {accountType , 
            firstName ,
            lastName , 
            email ,
            password ,
            confirmPassword ,
            otp , 
         });
          
         console.log(Response);
         if(!Response.data.success){
            return new Error(Response.data.message);
         }
         
         // means now user is successfully registored 
         // optimization req (pending) : i want that user should successfully login also time of signup 
         toast.success("Signup successfully")
         navigate('/login'); 

      }catch(error){
         console.log("SignUp api error" , error);
         toast.error("signup Failed")
         navigate('/signUp')
      }  
      dispatch(setLoading(false));
      toast.dismiss(toastId);          
    }   

}

export function login(email , password , navigate){
   return async(dispatch) => {
      dispatch(setLoading(true));
      const toastId = toast.loading("Loging Up....");
      try{
           const response = await ApiConnector("POST" , LOGIN_UP_API , {email , password});
           console.log("login api response ...." , response);
           if(!response.data.success){
              throw new Error(response.data.message);
           }

           toast.success("Login Successfully");

           const token = response.data.user.token || response.data.token;
           dispatch(setToken(token));
           console.log(token);
           
           
           const userImage = response.data?.user?.image?
            response.data?.user?.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`
           
           const user = response.data.user;
           console.log("user printing on login");
           dispatch(setUser({...user , image:userImage}));
           console.log(user);  
           localStorage.setItem('token' , JSON.stringify(token));
           localStorage.setItem('user' , JSON.stringify(user));

           //pending 2 is the navigate to dashboard 
           navigate('/dashboard/my-profile');
           

      }catch(e){
         console.log("error in loging in" , e);
         toast.error("error");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
   }
}

export function logout(navigate){
   return (dispatch) =>{
      const toastId = toast.loading("loggin out ...");
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/');
      toast.success("logout successfully");
      toast.dismiss(toastId);
   }
}



