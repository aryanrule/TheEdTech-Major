const Courses  = require('../Models/Courses');//the Courses model 
const Category = require('../Models/Category');
const User  = require('../Models/User');



const createCourses = async (req , res) => {
    try{
        const {courseName , courseDescription , whatYouWillLearn , price  , Category} = req.body;
        const thumbnail = req.files.thumbnail ;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail){
            return res.status(401).json({
                success:false , 
                message:"please fill all the details"
            });
        }

        const userId = req.body.id;
        const InstructorDetails = await User.findbyId({userId});
        if(!InstructorDetails){
             return res.status(401).json({
                success:false, 
                message:"instructor not found ", 
             });
        }
        const categoryDetails = await Category.findbyId({Category});
        if(!categoryDetails){
            return res.status(401).json({
                success:false, 
                message:"category not found ", 
            })
        }

        //upload the thumnal to cludinary 
        //this is leftover //WE WILL DO THIS AFTER SOME TIME 
        //some of the tasks are leftover 
        //LEFTOVER ::::::::::::-----?

        
        
        
  
    }catch(err){
       console.log("error in creating course", err);
       return res.status(500).json({
        success:false , 
        message:"not able to create the course there is some problem", 
       });
    }
}


const getAllCourses = async (req,res) => {
    try{
        const getAllCourses = await Courses.find({});
        return res.status(200).json({
            success:true , 
            message:"all the courses are fetched" , 
            data:getAllCourses
        })
    }catch(err){
        return res.status(500).json({
            success:false , 
            message:"there is some issue in getting all the courses"
           });
    }
}

module.exports = {createCourses , getAllCourses};




