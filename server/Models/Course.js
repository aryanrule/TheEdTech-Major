const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String
    } , 
    courseDescription:{
        type:String , 
    } , 
    instructor:{   //which instructir made this 
        type:mongoose.Schema.Types.ObjectId , 
        required:true , 
        ref:"User", 
    },
    wharYouwillLearn:{
        type:String , 
        type:true , 
    } , 
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:"Section"
        }
    ] , 
    ratingAndReviews:[  //this particular course then what is the rating
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref:"RatingAndReview" ,
        }
    ] , 
    price:{
        type:String , 
    } , 
    thumbnail:{
        type:String , 
    } , 
    tag:{
        type:[String] , // #python #ML 
    } , 
    category:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Category" , 
    } , 
    studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
    instructions: {
		type: [String],
	},
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

module.exports = mongoose.model("Course", CourseSchema);