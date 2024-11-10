//let us right some controllers related to auth and authentication

const User = require('../Models/User');
const OTP = require('../Models/OTP');
const OtpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../Models/Profile');
const JWT = require('jsonwebtoken');
const passwordUpdated = require('../Mail_Templates/passwordUpdatEmail');
const mailSender = require('../Utils/mailSender');



//always remember before entering 
exports.generateOTP = async (req, res)=>{
    try{
       const {email} = req.body;  //get the email

       const checkUserPresent = await  User.findOne({email});  //check if user is present
       if(checkUserPresent){
          return res.status(401).json({
            success:false , 
            message:"User is already registered", 
          });
       }

       //generate a otp
       var otp = OtpGenerator.generate(6 , {
           lowerCaseAlphabets:false, 
           upperCaseAlphabets:false , 
           specialChars:false , 
       });

       console.log("generated OTP", otp);

       //finding unique 
       //ok
       let result = await OTP.findOne({otp:otp});  //finding it key:value
       //why not 
       //let result = await OTP.findOne({otp});
       while(result){
         otp = OtpGenerator.generate(6 , {
            lowerCaseAlphabets:false, 
            upperCaseAlphabets:false , 
            specialChars:false , 
         });

         result = await OTP.findOne({otp:otp});
        }

        //somehow you found a unique value 
        const OtpPayLoad = {email , otp};
         
        //now create the entry 
        const otpBody = await OTP.create({OtpPayLoad});
        console.log(otpBody);
        
        res.status(200).json({
            success:true , 
            message:"otp sent succesfully", 
            otp, 
        });

        

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false , 
            message:"otp genration failed", 
        });
    }

}

//controller for signup details 
exports.signup = async(req ,res) => {
    try{
       const {firstName ,lastName , email, password ,confirmPassword  , accountType , otp , contactNumber} = req.body;

       if(!firstName || !lastName ||  !email || !password  || !otp || !confirmPassword){
           return res.status(403).json({
            success:false , 
            message:"All fields are required", 
           });
       }

       if(password !== confirmPassword){
          return res.status(400).json({
            success:false , 
            message:"password not matched" , 
          });
       }

       //check for existing user 
       const exisitingUser = await User.findOne({email});
       if(exisitingUser){
          return res.status(400).json({
            success:false, 
            message:"user already exist"
          })
       };

       //means noe you need a otp
       const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
       console.log(recentOtp);

       //validation otp
       if(recentOtp.length === 0){
         //means otp is not found 
         return res.status(400).json({
            success:false , 
            message:"otp not found", 
         });
         
       } else if(otp !== recentOtp[0].otp){
         return res.status(400).json({
            success:false,
            message:"invalid otp", 
         });
       }


       //else means otp is matched

       //hash 
       const hashedPassword = await bcrypt.hash(password ,10);

       
       let approved  = "" ;
       approved === "Instructor" ? (approved =false) : (approved=true);
       //now create entry in db 
       const profileDetails = await Profile.create({
         gender:null , 
         DateOfBirth:null , 
         contactNumber:null , 
         about :null  , 
       });

       //User model update 
       const user   = await User.create({
          firstName, 
          lastName,
          email, 
          contactNumber , 
          password:hashedPassword , 
          accountType:accountType, 
          additionalDetails:profileDetails._id,
          approved:approved , 
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
       })
       console.log(newUser);

       return res.status(200).json({
          success:true , 
          message:"user registerd successFully" ,
          user, 
       })


       


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "user cannot registor successfully ", 
        })
    }
}


//lets write the main imp controller 
exports.login = async(req,res)=>{
    try{
       const {email , password} = req.body;
       
       //validation 
       if(!email || !password){
        return res.status(403).json({
            success:false , 
            message:"fill somplete details", 
        });
       }
       
       const user = await User.findOne({email}).populate('additionalDetails'); //now i will also get the profile details 
       if(!user){
        return res.status(401).json({
            success:false , 
            message:"user not found ", 
        });
       }

       //now if you found thr user 
       //create a jwt 
       
       if(await bcrypt.compare(password,user.password)){
            
        //jwt contains three things payload , header , secret key 
        const payload = {
            email:user.email , 
            id:user._id , 
            accountType:user.accountType, 
        }

        const token = JWT.sign(payload , process.env.JWT_SECRET , {expiresIn:'2h'});
        
        // user = user.toObject();
        user.token = token ;  //created a feild in user and then created this token 
        user.password = undefined ;   //pass undfined krdo in user 

        //for cookie you need three things one is cookiename , token , options 
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),//ms or 3 days 
            httpOnly:true , //no access to the client side 
        }

        res.cookie("myCookie", token , options).status(200).json({
            success:true,
            message:"user login successfully", 
            user ,   
            token ,
        });

    
    
       }else{
         return res.status(401).json({
            success:false , 
            message:"password not matched", 
         })
       }

       

    }catch(e){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
}


//changepassword controller left ony 


//write one controller were you wanted to change the password

const changePassword = async (req , res) => {
    try{

        const userId = req.user.id;   //throigh middlewares 
        const userDetails = await  User.findById({userId});
        
        const {oldPassword , newPassword , confirmPassword}= req.body;
        
        const isPasswordMatched = bcrypt.compare(oldPassword , userDetails.password);
        if(!isPasswordMatched){
            return res.status(401).json({
                success:false , 
                message:"enter a correct password ", 
            });
        }
        
        if(newPassword !== confirmPassword){
            return res.status(401).json({
                success:false , 
                message:"password are not matching",
            });
        }
        const hashedPassword = bcrypt.hash(newPassword , 10);
        const updatedUserDetails = await User.findByIdAndUpdate(userId , {password:hashedPassword} , {new:true});
        

        //now send a verfication mail to the user
        try{
               const emailResponse = await mailSender(updatedUserDetails.email , 
                "Password updated successfully", 
                 passwordUpdated(updatedUserDetails.email , `password is updated for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));
                 console.log("password is changed successfully" , emailResponse);

        }catch(e){
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }


    }catch(e){
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});  
    }
}







