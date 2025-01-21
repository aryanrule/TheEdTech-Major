import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { UpdateProfilePicture } from "../../../services/operations/settingsApi";

const UpdatePicture = () => {
  /* making a logic so that user can see the image how it looks after uploading before even uploading on the server */
  const {token} = useSelector((state)=> state.auth);
  const { user } = useSelector((state) => state.profile);
  const InputRef = useRef(null);
  const [imageFile , setImageFile] = useState(null);
  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleClick(){
     InputRef.current.click();
  }

  function changeHandler(event){
   const file = event.target.files[0];
   console.log(file);
    if(file){
      setImageFile(file);
      console.log(imageFile);
      // preview pending 
    }
  }

  function uploadHandler() {
       try{
         console.log("uploading....");
         setLoading(true);
         const formData = new FormData();
         formData.append("UpdatePicture",imageFile);  // creating a new formData object to upload 
         console.log("formData" , formData);
        //  dispatch(UpdateProfilePicture(token , formData)).then(() => {
        //     setLoading(false);
        //  })
          setLoading(false);
       }catch(e){
          console.log("error in uploading the image");
       }
  }
  

  
  return (
    <div className="w-[90%] border-3 rounded-lg mt-[40px] min-h-[160px] flex justify-between items-center  bg-[#E5E4E2] border-mango-green">
      <div className=" flex  gap-5 p-4 ">
        <img
          src={user?.image}
          className="w-[90px] rounded-full object-cover"
        />

        <div className="ml-3  flex flex-col gap-4">
          <h5 className="font-bold text-[25px] ">Change Profile Picture</h5>

          <div className="flex">
          <input
            type="file"
            className="hidden"
            ref = {InputRef}
            onChange={changeHandler}
            accept="image/png, image/gif, image/jpeg"
          />
             
          <button
              className="bg-white  text-mango-green hover:text-lemon-yellow hover:bg-white px-4 py-2  text-sm  text-center rounded-xl transition-all duration-500 ease-in-out mr-5"
              style={{ minWidth: "100px", minHeight: "40px" }}
              onClick={handleClick}
            >
              <div className="flex items-center justify-center gap-3">
                Select  
              </div>
            </button>
             
            <button
              className="bg-mango-green text-lemon-yellow hover:text-mango-green hover:bg-white px-4 py-2  text-sm  text-center rounded-xl transition-all duration-500 ease-in-out mr-5"
              style={{ minWidth: "100px", minHeight: "40px" }}
              onClick={uploadHandler}
            >
              <div className="flex items-center justify-center gap-3">
                Upload <MdOutlineFileUpload className="text-lg" />{" "}
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePicture;
