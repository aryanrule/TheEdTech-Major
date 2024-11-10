const Course = require('../Models/Course');
const User = require('../Models/User');
const Category = require('../Models/Category');
const { UploadImageToCloudinary } = require('../Utils/uploadToCloud');

const createCourse = async (req, res) => {
    try{
        const {userId} = req.user.id;

        let {
            courseName , 
            courseDescription , 
            wharYouwillLearn  , 
            price , 
            tag , 
            category, 
            instructions ,
            status , 
        } = req.body;
        
        const thumbnail = req.files.thumbnail;

        if(!courseName || !courseDescription || !wharYouwillLearn || !price || !tag || !category || !instructions || !thumbnail){
            return res.status(201).json({
                success:false, 
                message:"fill the complete details" ,
            });
        }

        if(!status || status === undefined){
            status = "Draft"
        };

        //check for instryctor details 
        const instructorDetails = await User.findById(userId , {accountType:"Instructor"});
        if(!instructorDetails){
            return res.status(201).json({
                success:false , 
                message:"instrcutor details not found", 
            });
        }

        const categoryDetails = await Category.findById({category});
        if(!categoryDetails){
            return res.status(201).json({
                success:false , 
                message:"this categpry not found" , 

            })
        }

        const UploadThumbnail = await UploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
        console.log(UploadThumbnail);

        const newCourse = await Course.create({
            courseName ,
            courseDescription , 
            instructor:instructorDetails._id, 
            wharYouwillLearn:wharYouwillLearn, 
            price, 
            tag:tag , 
            category:categoryDetails._id , 
            instructions:instructions, 
            status:status, 
            thumbnail:UploadThumbnail.secure_url, 
        });

        //now update the course in the User model for the associated instructor ;
        await User.findByIdAndUpdate({_id:instructorDetails._id} , {$push:{courses:newCourse._id}} , {new:true});
        
        //adding 
        await Category.findByIdAndUpdate({_id:category} ,{$push:{courses:newCourse._id}}, {new:true});

        res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});



    }catch(e){
        console.log("some error in creating the course", e);
        res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    }
}

//making a controller where we are just looking our all the courses 
const getAllCourses = async (req, res) => {
    try{
          const allCourse = await Course.find({} , {
                courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
          }).populate("Instructor").exec();
          return res.status(200).json({
			success: true,
			data: allCourse,
		});
    }catch(e){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }

};



//now making a controller where we need to get the courses related to a particulat category 
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


module.exports = {};

