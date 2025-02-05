
const Course =  require('../Models/Course');
const Section = require('../Models/Section');
const SubSection = require('../Models/Subsection');
// exports.CreateSection = async (req , res) => {
//     try{
//          const {SectionName , CourseId}  = req.body;
//          if(!SectionName || !CourseId){
//             return res.status(400).json({
//                 success:false , 
//                 message:"Fill out complete details", 
//             });
//          }
          
         
//          const NewSection = await Section.create({SectionName});
//          console.log("NewSection" , NewSection);
//          //update in the course also 
//          //remember it was an array 

//          const UpdatedCourse = await Courses.findByIdAndUpdate(CourseId , {
//             $push:{
//                 courseContent:NewSection._id, //it will always return an updated document 
//             }
//          } , {new:true}  //it will return the updated dodument 
//         ).populate({
//             path:"courseContent" , 
//             populate:{
//                 path:"subSection", 
//             }
//         }).exec();


//         console.log("UpdatedCourse" , UpdatedCourse);
//         //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails console mein sections ki id nhi aaa rhi 
        
//         return res.status(200).json({
//             success:true , 
//             message:"Section created successfully",
//             UpdatedCourse
//         })

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Unable to create Section, please try again",
//             error:error.message,
//         });
//     }
// }


exports.CreateSection = async(req  , res) => {
    try{
        const {SectionName , CourseId} = req.body;
        console.log("sectionName" , SectionName , " courseId " , CourseId);
        if(!SectionName || !CourseId){
            return res.status(400).json({
                success:false , 
                message:"Fill out complete details" , 
            })
        }

        const NewSection = await Section.create({SectionName});
        console.log("NewSection is ", NewSection);

        // now the main task here is that create an entry of id of this newSection into the courseContent of the corresponding  course with the corresponding courseId 
        // you actually need to populate the result also 
        // const UpdatedSection = await Course.findByIdAndUpdate(
            const UpdatedCourse = await Course.findByIdAndUpdate(
                CourseId, 
                {
                    $addToSet: { courseContent: NewSection._id }  // instead of $push use this  $addToSet to avoid duplicates 
                }, 
                { new: true }
            )
            .populate({
                path: "courseContent", // means all sections 
                populate: { path: "subSection" }  // and all subsections of these sections 
            })
            .exec();

        // const updatedCourse = await Course.findByIdAndUpdate(courseId , {
        //     $push : {
        //         courseContent : 
        //     }
        // })

        return res.status(200).json({
            message:"Section is created succesfully", 
            success:true , 
            data:UpdatedCourse
        })

        

    }catch(error){
        return res.status(500).json({
            success:false , 
            message:"Unable to create Section ! please try again" , 
            error:error.message, 
        })
    }
}

exports.updateSection = async (req , res)=> {
    try{ 
          // update the section here and then 
          const {sectionId , courseId , sectionName} = req.body;

          const updateSection = await Section.findByIdAndUpdate(sectionId ,
            {SectionName  : sectionName} , 
            {new : true} , 
          );
          console.log("updated section" , updateSection);

          const course = await Course.findById(courseId).populate({
            path : 'courseContent' , 
            populate: {
                path : 'subSection' ,
            }
          }).exec();
          console.log("updated course", course);


          
          return res.status(200).json({
            success:true , 
            message:"section updated successfully" , 
            data : course , 
          });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
}


//delete section 
exports.deleteSection = async (req , res) => {
    try{
       const {sectionId , courseId } = req.body;

       // pull your section from the particular course 
       
       await Course.findByIdAndUpdate(courseId , {
          $pull :{
            courseContent : sectionId , 
          }
       });
       
       const section = await Section.findById(sectionId);
       if(!section){
          return res.status(404).json({
            success:false , 
            message: "Section is not present"
          })
       }

       // now delete the subsection acoosiated with that section from the db also 
       await SubSection.deleteMany({_id : {$in : section.subSection}});

       await Section.findByIdAndDelete(sectionId);

       const course = await Course.findById(courseId).
       populate({
           path : "courseContent" , 
           populate: {
            path: "subSection", 
           } , 
       }).exec();
       
       console.log(course);

       return res.status(200).json({
          success: true , 
          message:"Update Course after deletion of a Section" ,
          data : course , 
       })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}

