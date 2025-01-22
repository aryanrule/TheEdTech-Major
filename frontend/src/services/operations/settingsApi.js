import { SettingsEndPoints } from "../api";
import {toast} from 'react-hot-toast';
import { ApiConnector } from "../apiConnector";

//upating the profile picture 
export function UpdateProfilePicture(token , formData){
     return async(dispatch)=> {
        try{
            return 0;
        }catch(error){
            console.log()
        }

        
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





