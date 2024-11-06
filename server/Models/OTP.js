//otp task 

const mongoose = require('mongoose');
const mailSender  = require('../Utils/mailSender');

const OtpSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true , 
     } , 
     otp:{
        type:String , 
        required:true , 
     } ,
     createdAt:{
        type:Date , 
        default:Date.now() ,
        expires:5*60 , //in 5 min  
     }
});

async function sendVerificationEmail(email , otp){
     try{
       const response = await mailSender(email , "verification Email from StudyVizards" , otp);
       console.log(response);
     }catch(e){

     }
}

OtpSchema.pre('save' , async function(next){
      await sendVerificationEmail(this.email , this.otp);
      next();  //if no error then now you can save your document 
})


module.exports = mongoose.Schema('OTP' , OtpSchema);