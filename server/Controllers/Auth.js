//let us right some controllers related to auth and authentication
const User = require('../Models/User');
const OTP = require('../Models/OTP');
const OtpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../Models/Profile');
const JWT = require('jsonwebtoken');
const {passwordUpdated} = require('../Mail_Templates/passwordUpdatEmail');
const mailSender = require('../Utils/mailSender');


//generating otp 
exports.generateOTP = async (req, res)=>{
    try{
       const {email} = req.body;  //get the email

       const checkUserPresent = await User.findOne({email});  //check if user is present
       if(checkUserPresent){
          return res.status(401).json({
            success:false , 
            message:"User is already registered", 
          });
       }
       console.log("doing something here");
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
        


        
        const otpBody = await OTP.create({email , otp});
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

exports.checkUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if the user exists in the database
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(200).json({
                success: true,
                message: "YES",
            });
        } 

        // User not found
        return res.status(404).json({
            success: true,
            message: "NO",
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Error in fetching user details",
        });
    }
};



exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
        const allOTps = await OTP.find({});
        console.log(allOTps);
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
         
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,  //this users profileID in future to update 
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};




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
       const passCheck = await bcrypt.compare(password , user.password);

       if(passCheck){
            
        //jwt contains three things payload , header , secret key 
        const payload = {
            email:user.email , 
            id:user._id , 
            accountType:user.accountType, 
        }

        const token = JWT.sign(payload , process.env.JWT_SECRET , {expiresIn:'10h'});
        
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
        console.error(e);
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
}


// //changepassword controller left ony 
// //write one controller were you wanted to change the password
// exports.changePassword = async (req , res) => {
//     try{

//         const userId = req.user.id;   //throigh middlewares 
//         const userDetails = await  User.findById(userId);
//         console.log(userId);

//         const {oldPassword , newPassword , confirmNewPassword}= req.body;
//         console.log(userDetails);

//         const hpass = await bcrypt.hash(oldPassword,10);
//         console.log(hpass);
//         console.log(userDetails.password);


//         const isPasswordMatched = await bcrypt.compare(oldPassword , userDetails.password);
        
        
//         console.log(isPasswordMatched);
//         if(!isPasswordMatched){
//             return res.status(401).json({
//                 success:false , 
//                 message:"enter a correct password ", 
//             });
//         }
        
//         if(newPassword !== confirmNewPassword){
//             return res.status(400).json({
//                 success:false , 
//                 message:"password are not matching",
//             });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword , 10);
//         const updatedUserDetails = await User.findByIdAndUpdate(userId , {password:hashedPassword} , {new:true});
        
//         //now send a verfication mail to the user
//         try{
//                const emailResponse = await mailSender(updatedUserDetails.email , 
//                 "Password updated successfully", 
//                  passwordUpdated(updatedUserDetails.email , `password is updated for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));


//                  console.log("password is changed successfully" , emailResponse);

//         }catch(error){
//             console.error("Error occurred while sending email:", error);
// 			return res.status(500).json({
// 				success: false,
// 				message: "Error occurred while sending email",
// 				error: error.message,
// 			});
//         }


//     }catch(e){
//         console.error("Error occurred while updating password:", e);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error occurred while updating password",
// 			error: e.message,
// 		});  
//     }
// }




exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
       
        const isPasswordMatched = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Incorrect old password",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password updated successfully",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password has been successfully updated for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Password change email sent successfully:", emailResponse);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Password updated, but an error occurred while sending the email",
                error: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};
