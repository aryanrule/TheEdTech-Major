import { SettingsEndPoints } from "../api";
import {toast} from 'react-hot-toast';
import { ApiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";


//upating the profile picture 
export function UpdateProfilePicture(formdata , token){
    //  we can also use normal async await but we are using redux thunk for this 
     return async (dispatch) => {
        const toastId = toast.loading("uploading");
        try {
            const response = await ApiConnector("PUT" , SettingsEndPoints.UPDATE_PROFILE_PICTURE , formdata , {
            Authorization : `Bearer ${token}`
            })
            
            if (!response?.data?.success) {
                throw new Error(response.data.message)
            }
            
            toast.success("Image uploaded succesfully");
            console.log(response);
            dispatch(setUser(response?.data?.updatedProfile));
            
            
        }catch(error){ 
            console.log("internal server error" , error);
            toast.error(error.message);
        }

        toast.dismiss(toastId);
     }
     
}

export function deleteAccount(user , navigate){
    return async(dispatch)=> {
        const ToastId = toast.loading("deleting....");
        try {
            console.log("deleteuser Api" , SettingsEndPoints.DELETE_ACCOUNT);
            const Response = await ApiConnector("POST" , SettingsEndPoints.DELETE_ACCOUNT , {user});
            if(!Response){
                console.log("coudnt delete the account");
                return;
            }
            
            toast.success("Account deleted");
            navigate('/');
        }catch(error){
            console.log("something went wrong while hitting DeleteAccount Api")
            toast.error("error");
        }
        toast.dismiss(ToastId);
    }
}


export const updateProfileInfo = (formdata , token) => {
    return async (dispatch) => {
        const toastId =  toast.loading("updating....");
        try {
           console.log(SettingsEndPoints.UPDATE_PROFILE);
           
           const response = await ApiConnector("POST" , SettingsEndPoints.UPDATE_PROFILE , formdata , {
            Authorization : `Bearer ${token}`
           });
           console.log(response);
           
           
        }catch(error){
           console.log("error while hitting the upateProfile API" , error);
           toast.error(error.message);

        }
        toast.dismiss(toastId);
    }
}



export const changePassword = (formdata , token) => {
     
     return async () => {
        const toastId = toast.loading("updating...");
        try {
           const response = await ApiConnector("POST" , SettingsEndPoints.CHANGE_PASSWORD , formdata , {
            Authorization : `Bearer ${token}`
           });
           
           console.log(response);
           if(!response?.data?.success){
             throw new Error("coudnt update the password");
           }

           toast.success("password updated succesfully");

        }catch(error){
            console.log("error while hitting the upateProfile API" , error);
            toast.error(error.message);
 
        }
        toast.dismiss(toastId);
     }
}



