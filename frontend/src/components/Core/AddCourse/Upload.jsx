import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { VscDiffIgnored } from "react-icons/vsc";
import { Player } from "video-react";
/*
thigs i need to understand 
1. i need to understand about drropzone 
2 . i need to understand about how file uploadation using broweser 
3 . i need to understand about how to manage preview 
4 . i need to understand what if someone uploads a vidio format check :) 
5 . i need to understand what if the mode is of editcourse mode 
6 . and some minor things  
*/

// this is actually a very important component to upload that will be further reused
// this is the component which is used for both the vidio and

const Upload = ({
  label,
  name,
  register,
  viewData = null,
  editData, 
  setValue,
  errors,
  video = false, // if i dont pass a vidio then make it false // since in thumbnail i wanted to upload a thumbnail not a vidio
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(
    viewData ? viewData : (editData ? editData : "")
  );

  const inputRef = useRef(null);

  const onDrop = (acceptedFile) => {
    console.log(acceptedFile);
    console.log(acceptedFile[0]);

    const file = acceptedFile[0];
    if (file) {
      setSelectedFile(file);
      previewFile(file); // this function actually set you preview
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewSrc(reader.result);
    };
    if (!previewSrc) {
      console.log("lode lag gye");
    }
    console.log("this is preview srx", previewSrc);
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  useEffect(() => {
    console.log(" consoling log prvsrc", previewSrc);
  }, [previewSrc]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-black" htmlFor={name}>
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {previewSrc ? (
        <div className="flex w-full flex-col p-6">
          {!video ? (
            <img
              src={previewSrc}
              alt="PreView"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <Player aspectRatio="16:9" playsInline src={previewSrc} />
          )}

          {!viewData && (
            <button
              onClick={(e) => {
                setPreviewSrc("");
                setSelectedFile(null);
                setValue(name, null);
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div
          className={` ${
            isDragActive ? " bg-mango-green" : ""
          }    flex min-h-[250px] cursor-pointer  items-center justify-center rounded-md border-2 border-mango-green`}
        >
          {/* this is the actual div i need to show when there is nothing in preview no file is selected and not even in the edit mode */}
          <div
            {...getRootProps()}
            className="flex w-full flex-col items-center p-6"
          >
            <input
              {...getInputProps()}
              type="file"
              className="hidden"
              ref={inputRef}
            />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-white">
              <FiUploadCloud className="text-2xl text-mango-green" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-black">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-mango-green">Browse</span> a
              file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-black ">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        </div>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;
