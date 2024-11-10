//otp task 

const mongoose = require('mongoose');
const mailSender  = require('../Utils/mailSender');
const otpTemplate = require('../Mail_Templates/emailVerification');

const OtpSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true , 
     } , 
     otp:{
        type:String , 
        required:true , 
     } ,
     createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	  },
});

async function sendVerificationEmail(email , otp){
     try{
       const response = await mailSender(email , "verification Email from StudyVizards" , otpTemplate(otp));
       console.log(response);
       console.log("email send successfully");
     }catch(e){
       console.log("Erorr occured while sending email for otp verification" , e);
       throw e;
     }
}

OtpSchema.pre('save' , async function(next){
      console.log("new document is saved to database");

      if(this.isNew){  //isNew checks that the documnt saved is the new one not the updated one 
         await sendVerificationEmail(this.email , this.otp);
      }
      
      next();  //if no error then now you can save your document 
})


module.exports = mongoose.Schema("OTP" , OtpSchema);