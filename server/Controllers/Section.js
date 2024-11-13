
const Courses =  require('../Models/Course');
const Section = require('../Models/Section');

exports.CreateSection = async (req , res) => {
    try{
         const {SectionName , CourseId}  = req.body;
         if(!SectionName || !CourseId){
            return res.status(400).json({
                success:false , 
                message:"Fill out complete details", 
            });
         }
          
         
         const NewSection = await Section.create({SectionName});
         console.log(NewSection);
         //update in the course also 
         //remember it was an array 

         const UpdatedCourse = await Courses.findByIdAndUpdate(CourseId , {
            $push:{
                CourseContent:NewSection._id, //it will always return an updated document 
            }
         } , {new:true}  //it will return the updated dodument 
        ).populate({
            path:"courseContent" , 
            populate:{
                path:"subSection", 
            }
        }).exec();

        console.log(UpdatedCourse);
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        
        return res.status(200).json({
            success:true , 
            message:"Section created successfully",
            UpdatedCourse
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}


exports.updateSection = async (req , res)=> {
    try{
          const { NewSectionName , SectionId} = req.body;
             if(!NewSectionName || !SectionId) {
                return res.status(400).json({
                success:false,
                message:'Missing Properties',
                });
          }
          
          const updatedSection =await  Section.findByIdAndUpdate(SectionId, {NewSectionName} , {new:true});
          console.log(updatedSection);
          
          return res.status(200).json({
            success:true , 
            message:"section updated successfully" , 
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
         const {SectionId} = req.body;
         if(!SectionId){
            return res.status(400).json({
                success:false , 
                message:"enter Section id", 
            })
         }

         const DeletedSection = await Section.findByIdAndDelete({_id:SectionId});
         console.log(DeletedSection);

         return res.status(200).json({
            success:true , 
            message:"section deleted successfully", 
         })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}

