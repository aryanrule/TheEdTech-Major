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





