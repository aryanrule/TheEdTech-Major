const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
      Rating:{
        type:Number , 
        required:true , 
      } , 
      Reviews:{
        type:String , 
        required:true, 
      } , 

      //this is  a ref that who who have given the ratiung and reviews 
      //this is leftover 
      user:{
            type:mongoose.Schema.Types.ObjectId  , 
            required:true, 
            ref:"User",  
       }
})