//let us right some controllers related to auth and authentication

const User = require('../Models/User');
const OTP = require('../Models/OTP');
const OtpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../Models/Profile');
const JWT = require('jsonwebtoken');



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

//lwts write or signup 
//here actually the user is created
exports.signup = async(req ,res) => {
    try{
       const {firstName ,lastName , email, password ,confirmPassword  , accountType,otp, contactNumber} = req.body;

       if(!firstName || !lastName ||  !email || !password  || !otp){
           return res.status(403).json({
            success:false , 
            message:"complete all fields", 
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
       const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
       console.log(recentOtp);

       //validation otp
       if(recentOtp.length == 0){
         //means otp is not found 
         return res.status(400).json({
            success:false , 
            message:"otp not found", 
         });
         
       } else if(otp !== recentOtp.otp){
         return res.status(400).json({
            success:false,
            message:"invalid otp", 
         });
       }


       //else means otp is matched

       //hash 
       const hashedPassword = await bcrypt.hash(password ,6);


       //now create entry in db 
       const profileDetails = await Profile.create({
         gender:null , 
         DateOfBirth:null , 
         contactNumber:null , 
         about :null  , 
       });

       //User model update 
       const newUser = await User.create({
          firstName, 
          lastName,
          email, 
          password:hashedPassword , 
          accountType , 
          additionalDetails:profileDetails,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
       })
       console.log(newUser);

       return res.status(200).json({
          success:true , 
          message:"user registerd successFully" ,
          newUser, 
       })


       


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message , 
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
        
        user = user.toObject();
        user.token = token ;
        user.password = undefined ;

        //for cookie you need three things one is cookiename , token , options 
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),//ms or 3 days 
            httpOnly:true , //no access to the client side 
        }

        res.cookie("myCookie", token , options).status(200).json({
            success:true,
            message:"user created successfully", 
            user ,   
        });

    
    
       }else{
         return res.status(401).json({
            success:false , 
            message:"password not matched", 
         })
       }

       

    }catch(e){

    }
}


//changepassword controller left ony 








