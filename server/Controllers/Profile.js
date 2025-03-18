//ok lets solve this 
const User = require('../Models/User');
const Profile = require('../Models/Profile');
const { uploadImageToCloudinary } = require('../Utils/uploadToCloud');


exports.UpdateProfile = async (req , res) => {
    try{
        const userId = req.user.id;
        const {
            firstName = "" , 
            lastName = "" , 
            dateOfBirth = "" , 
            about = "" , 
            contactNumber = "" , 
            gender = "" , 
        }  = req.body;


        const userDetails = await User.findById(userId);
        const profile = await Profile.findById(userDetails.additionalDetails);
        
        const user = await User.findByIdAndUpdate(userId , {
            firstName , 
            lastName , 
        });

        await user.save();

        profile.DateOfBirth = dateOfBirth , 
        profile.gender = gender , 
        profile.about = about , 
        profile.contactNumber = contactNumber , 

        await  profile.save();

        const updatedUserDetails = await User.findById(userId).populate("additionalDetails").exec();

        return res.json({
           success:true , 
           updatedUserDetails , 
           message: "Profile updated successfully",
        })

        

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};


exports.deleteAccount = async (req, res) => {
    try{
       
        //first delete the profile in user then user 
        const userId = req.user.id;
        console.log(userId);
        const UserDetails = await User.findById({_id:userId});
        if(!UserDetails){
            return res.status(401).json({
                success:false , 
                message:"userId is not valid" ,
            });
        }

        await Profile.findByIdAndDelete({_id:UserDetails.additionalDetails});
        await User.findByIdAndDelete({_id:userId});
        
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
};


exports.getUserAllDetails = async (req, res) => {
    try{
         const userId = req.user.id;
         const UserDetails = await User.findById(userId).populate("additionalDetails").exec();
         if(!UserDetails){
            return res.status(401).json({
                success:false, 
                message:"the user is not present" , 
            })
         }
         return res.status(200).json({
            success:true,
            message:"user fetched successFully",
            UserDetails ,
         });

    }catch(error){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


//exporting left 
exports.UpdateProfilePicture = async (req , res) => {
    try{
         const userId = req.user.id;  // through auth middleware 
         const NewPicture = req.files.UpdatePicture;
         if(!NewPicture){
            return res.status(401).json({
                success:false, 
                message:"new picture is not there",
            })
         }
         
         const image = await uploadImageToCloudinary(NewPicture , process.env.FOLDER_NAME , 1000 , 1000);
         console.log(image);
         console.log("image uploaded successfully");         
         const updatedProfile = await User.findByIdAndUpdate({_id:userId} , {image:image.secure_url}  ,{new:true});
         res.send({
            success:true , 
            message:"image updated successFully", 
            updatedProfile, 
         })
    }catch(e){
        return res.status(500).json({
            success:false , 
            message:`not able to update the profile picture there is some fault :error ${e}` , 
        });
    }
}


//writing a controller where we just wanted to gettheCourses in which the user is actually enrolled 
exports.getUsersEnrolledCourses = async (req , res) => {
      try{ 
          const userId = req.user.id;
          const userDetails = await User.findOne({_id:userId}).populate("Courses").exec();
          if(!userDetails){
               return res.status(400).json({
                   success:false , 
                   message:"User not found",

               });
          }

          return res.status(200).json({
            success:true , 
            message:"User fetched successfully" , 
            userDetails
          })


           
      }catch(error){
          return res.status(500).json({
             success:false , 
             message:"User cannot be fetched " ,
          })
      }

}


