const Course = require("../Models/Course");
const User = require("../Models/User");
const Category = require("../Models/Category");
const { uploadImageToCloudinary } = require("../Utils/uploadToCloud");
const Section = require("../Models/Section");
const Subsection = require("../Models/Subsection");

exports.createCourse = async (req, res) => {
  try {
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
      status,
    } = req.body;

    const thumbnail = req.files ? req.files.thumbnail : null;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouwillLearn ||
      !price ||
      !tag ||
      !category ||
      !instructions ||
      !thumbnail
    ) {
      console.log(
        courseName,
        courseDescription,
        whatYouwillLearn,
        price,
        tag,
        category,
        instructions,
        thumbnail
      );
      return res.status(400).json({
        success: false,
        message: "Fill in all the required details.",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    //check for instryctor details

    const instructorDetails = await User.findById(userId);
    console.log(instructorDetails);
    if (!instructorDetails) {
      return res.status(201).json({
        success: false,

        message: "instrcutor details not found",
      });
    }

    const categoryDetails = await Category.findOne({ name: category });
    console.log(categoryDetails);
    if (!categoryDetails) {
      return res.status(201).json({
        success: false,
        message: "this categpry not found",
      });
    }

    const UploadThumbnail = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouwillLearn,
      price,
      tag: JSON.parse(tag),
      category: categoryDetails._id,
      instructions: JSON.parse(instructions),
      status: status,
      thumbnail: UploadThumbnail.secure_url,
    });
    console.log(newCourse);
    //now update the course in the User model for the associated instructor;

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { Courses: newCourse._id } },
      { new: true }
    );

    //adding
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    ); // same cetegory se associated course

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log("some error in creating the course", error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course is not associated with this id",
      });
    }

    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnail;
      const updloadThumnail = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = updloadThumnail.secure_url; // created a field in course and then updated it
    }

    //update only the keys present in update
    // console.log("hello");
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();  // save yourse course in the doc 
    // now return a course with every detail in it 
    const updatedCourse = await Course.findOne({_id:courseId}).populate({
      path : "instructor" , 
      populate : {
          path : "additionalDetails" , 
      }
    }).populate("category")
    .populate({
      path : "courseContent" , 
      populate : {
        path : "subSection" , 
      }
    }).exec();

    res.json({
      success: true,
      message: "course Updated successfully",
      updatedCourse: updatedCourse 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.findCourseByInstructor = async (req , res) => {
    try {
        
       //  here i got the bug 
       // i dont need to destrcuture the instructor id 
      //  const  {InstructorId} = req.user.id;
       

        const  InstructorId= req.user.id;
        console.log("instructorId "  , InstructorId);
        
        // validations ko check krte hai 
        // i dont need to poplate here 

        const InstructorsCourse = await Course.find({instructor : InstructorId}).sort({createdAt : -1});
        console.log("course by instructor ", InstructorsCourse);

        res.status((200)).json({
          success:true, 
          message : "Here are all the courses with this instructor" , 
          data : InstructorsCourse , 
        })

        


    }catch(error){
       console.log(error);
       return res.status(500).json({
         success:false , 
         message:"coudnt fetch instructor by its id",
       })
    }
}




// now we need to build a controller in which we will be updating the course
// if you are updating a course which means there is a course already available
// and you just need to update the course using the id ;

//making a controller where we are just looking our all the courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec(); //i also wanted the corresponding Instructor for that project
    return res.status(200).json({
      success: true,
      data: allCourse,
    });
  } catch (error) {
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
// somethings are actually leftover here 
// there are so many things leftover here 
exports.getFullCourseDetails = async (req , res) => {
      try {
          // other things are leftover in this code 
          const {courseId} = req.body;
          const courseDetails = await Course.findOne({_id : courseId})
          .populate({
            path :"courseContent" , 
            populate:{
                path : "subSection"  , 
            }

          }).populate("category")
          .populate("")
          
          if(!courseDetails){
            return res.status(400).json({
              success:false, 
              message : `Could not find course with id: ${courseId}`,
            })
          }

          return res.status(200).json({
            success:true, 
            data :{
              courseDetails , 
            } , 
            message :"here are your complete fullcourseDetails" , 
          })


      }catch(error){
        console.log("coudnt get the full course details" , error);
      }
}
  

// lets write a controller to delete the course 
// delete the course delete the associated all thes sections and then delete the subsections also 
exports.deleteCourse  = async (req , res) => {
     try {
         const {courseId} = req.body;
         
         const course = await Course.findById(courseId);
         if(!course){
          return res.status(404).json({
            success:false , 
            message:"no course available with this courseId" , 
          });

         }

         //first task is to enenroll or removeCourseId from the courseId 
         const studentEnrolled =  course.studentsEnrolled;
         for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(studentId , {
              $pull : {
                courses:courseId , 
              }
            });
         }


         // now delete all the sections and corresponding subsections from the  
         const courseSections = course.courseContent;
         for(const sectionId of courseSections){
              const section = await Section.findById(sectionId);
              if(section){
                  const subSections = section.subSection;
                  for(const subSectionId of subSections){
                    await Subsection.findByIdAndDelete(subSectionId);
                  }
              }   
              
              // now delete the section to
              await Section.findByIdAndDelete(sectionId);
         }



         //now delete corresponding course also 
         await Course.findByIdAndDelete(courseId);


         return res.status(200).json({
            success : true , 
            message : "course deleted successfully" , 
            
         })

     }catch(error){
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
     }
}