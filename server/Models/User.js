const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstName:{
        type:String,
        required:true ,
        trim:true ,  
     } , 
     lastName:{
        type:String,
        required:true ,
        trim:true ,  
     } , 
     email:{
        type:String,
        required:true ,
        trim:true ,  
     },
     password:{
        type:String , 
        required:true, 
     }  , 
     accountType:{
        type:String , 
        required:true , 
        enum:["Admin", "Student" , "Instructor"] , 
     } , 
     additionalDetails:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true , 
        ref:"Profile" , 
     } , 
     active:{
       type:Boolean , 
       default:true ,
     } , 
     approved:{
      type:Boolean , 
      default:true , 
     } , 

     Courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true , 
            ref:'Course' , 
        }
     ] , 
     CourseProgress:[
         {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"CourseProgress"
         }
     ] , 
     image:{
        type:String , 
        required:true , 

     } ,
     token:{
         type:String 
     } , 
     resetPassWordExpires:{
          type:Date , 
     }

}  ,{timestamps:true});  //timestamps gives the time of update the document 

module.exports = mongoose.model('User' , userSchema);