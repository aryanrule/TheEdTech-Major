const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String, 
    } , 
    courseDescription:{
        type:String , 
    } , 
    instructor:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User' , 
    } , 
    whatYouWillLearn:{
        type:String , 
    } , 
    CourseContent:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:'Section' , 
        }
    ] , 
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:'RatingAndReviews' ,
        }
    ] , 
    price:{
        type:Number, 
    } , 
    thumbnail:{
        type:String , 
    } , 
    //tag/category pending 

    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User" , 
        required:true , 
    }] , 
    

});


module.exports = mongoose.model('Courses' , CourseSchema);