//ok lets solve this 
const User = require('../Models/User');
const Profile = require('../Models/Profile');


const CreateProfile = async (req , res) => {
    try{
      const {DateOfBirth="",about="" , gender , contactNumber } = req.body;
      const UserId = req.user.id;

      if(!contactNumber || !UserId || !gender){
        return res.status(400).json({
            success:false,
            message:'All fields are required',
        });
      }
      
      
      const UserDetails = await User.findById({UserId});
      const ProfileId = await UserDetails.additionalDetails;
      const profileDetails = await Profile.findById({ProfileId});

      ///update profile  //this might be wrong
      profileDetails.DateOfBirth = DateOfBirth;
      profileDetails.about = about ;
      profileDetails.gender = gender;
      profileDetails.contactNumber=contactNumber;

      await profileDetails.save();

      return res.status(200).json({
        success:true , 
        message:"profile is created successfully", 
      });

    }catch(e){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};


const deleteAccount = async (req, res) => {
    try{
       
        //first delete the profile in user then user 
        const userId = req.user.id;
        const UserDetails = await User.findById({userId});
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


const getUserAllDetails = async (req, res) => {
    try{
         const userId = req.user.id;
         const UserDetails = await User.findById(userId).populate("additionalDetails").exec();

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

