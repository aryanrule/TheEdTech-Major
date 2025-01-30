const Course = require('../Models/Course');
const User = require('../Models/User');
const Category = require('../Models/Category');
const { uploadImageToCloudinary } = require('../Utils/uploadToCloud');



exports.createCourse = async (req, res) => {
    try{
        const userId = req.user.id;
        console.log(userId);
        let {
            courseName, 
            courseDescription, 
            whatYouwillLearn, 
            price, 
            tag, 
            category, 
            instructions,
            status 
          } = req.body;
          
          const thumbnail = req.files ? req.files.thumbnail : null;
        
          if (!courseName || !courseDescription || !whatYouwillLearn || !price || !tag || !category || !instructions || !thumbnail) {
            console.log(courseName, courseDescription, whatYouwillLearn, price, tag, category, instructions, thumbnail);
            return res.status(400).json({
              success: false, 
              message: "Fill in all the required details."
            });
          }
        
        

        if(!status || status === undefined){
            status = "Draft"
        };

        //check for instryctor details 
        
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails)
        if(!instructorDetails){
            return res.status(201).json({
                success:false , 
                
                message:"instrcutor details not found", 
            });
        }
        
        
        const categoryDetails = await Category.findOne({name:category});
        console.log(categoryDetails);
        if(!categoryDetails){
            return res.status(201).json({
                success:false , 
                message:"this categpry not found" , 

            })
        }
        
        const UploadThumbnail = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
    
        const newCourse = await Course.create({
            courseName ,
            courseDescription , 
            instructor:instructorDetails._id, 
            whatYouwillLearn:whatYouwillLearn, 
            price, 
            tag:tag , 
            category:categoryDetails._id , 
            instructions:instructions, 
            status:status, 
            thumbnail:UploadThumbnail.secure_url, 
        });
        console.log(newCourse);
        //now update the course in the User model for the associated instructor;

        await User.findByIdAndUpdate({_id:instructorDetails._id} , {$push:{Courses:newCourse._id}} , {new:true});
        
        //adding 
        await Category.findByIdAndUpdate({_id:categoryDetails._id} ,{$push:{courses:newCourse._id}}, {new:true});

        res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});



    }catch(error){
        console.log("some error in creating the course", error);
        res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    }
}

//making a controller where we are just looking our all the courses 
exports.showAllCourses = async (req, res) => {
    try{
          const allCourse = await Course.find({} , {
                courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
          }).populate("instructor").exec();  //i also wanted the corresponding Instructor for that project 
          return res.status(200).json({
			success: true,
			data: allCourse,
		});
        
    }catch(error){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }

};


//this is a controller where i need the complete data of the course 
//LEFTOVER 
const getCourseDetails  = async (req, res) => {
    try{
       const courseId  = req.body ;

       //finding the coursedetails 
       const courseDetails = await Course.find({_id:courseId}).populate({})


    }catch(e){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }

};

