import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { UpdateProfilePicture } from "../../../services/operations/settingsApi";
import IconBtn from "../../Common/IconBtn";
import { FiUpload } from "react-icons/fi"
import toast from "react-hot-toast";


const UpdatePicture = () => {
 
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const [previewSrc , setPreviewSrc]  = useState(null);
  const [imageFile , setImageFile] = useState(null);
  const [loading , setLoading] = useState(null);
  const dispatch = useDispatch();

  const hRef = useRef();
  const handleClick = () => {
      hRef.current.click()
  }

  const handleFileChange = (e) =>{
        
        const file = e.target.files[0]
        console.log(file);
        if(file){
            setImageFile(file);
            previewImage(file);
        }
  }

  const previewImage = (file) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = () =>{
           setPreviewSrc(reader.result);
       }
  }

  const handleChangeProfilePic =  () => {
        try {
           if(!imageFile){  // if null
            toast.error("please select a picture");
           }
           else {
            console.log("uploading ....") ;
            setLoading(true);
            const formdata = new FormData();
            formdata.append("UpdatePicture" , imageFile);  
            dispatch(UpdateProfilePicture(formdata , token)).then(() => {
              setLoading(false);
            })
           }
           

        }catch(error){
           console.log("ERROR MESSAGE - ", error.message) 
        }
  }
  
  
  useEffect(() => {
    console.log("user"  , user);
    if(imageFile){
      previewImage(imageFile);
    }
  } , [imageFile]);
  
  return (
    <>
       <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src = { previewSrc || user?.image}
            className="aspect-square w-[78px] bg-white rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={hRef}
                className="hidden"
                accept="image/png , image/gif  , image/jpeg"
                onChange={handleFileChange}
               
              />
              <button
                onClick={handleClick}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text = {loading ? "uploading..." : "upload"}
                onclick={handleChangeProfilePic}
              >
                {!loading && (
                  <FiUpload className="text-lg text-white" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePicture;
