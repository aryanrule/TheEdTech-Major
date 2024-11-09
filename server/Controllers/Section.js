
const Courses =  require('../Models/Courses');
const Section = require('../Models/Section');

const CreateSection = async (req , res) => {
    try{
         const {SectionName , CourseId}  = req.body;
         if(!SectionName || !CourseId){
            return res.status(400).json({
                success:false , 
                message:"Fill out complete details", 
            });
         }
          
         
         const NewSection = await Section.create({NewSection});
         console.log(NewSection);
         //update in the course also 
         //remember it was an array 
         const UpdateCourses = await Courses.findByIdAndUpdate(CourseId , {
            $push:{
                CourseContent:NewSection._id, //it will always return an updated document 
            }
         } , {new:true}  //it will return the updated dodument 
        );
        console.log(UpdateCourses);
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        
        return res.status(200).json({
            success:true , 
            message:"Section created successfully",
            UpdateCourses
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}


const updateSection = async (req , res)=> {
    try{
          const {SectionName , SectionId} = req.body;
             if(!SectionName || !SectionId) {
                return res.status(400).json({
                success:false,
                message:'Missing Properties',
                });
          }
          
          const updatedSection =await  Section.findByIdAndUpdate(SectionId, {SectionName} , {new:true});
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
const deleteSection = async (req , res) => {
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

module.exports = {CreateSection , updateSection , deleteSection} 