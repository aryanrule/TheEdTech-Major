//for a section create subsection 
const Section = require('../Models/Section');
const { uploadImageToCloudinary } = require("../Utils/uploadToCloud");
require('dotenv').config();
const subSection = require('../Models/Subsection');

exports.createSubSection = async (req , res) => {
    try{
       const {SectionId , title , description  } = req.body;

       const video = req.files.VideoFile;  //give the name videoFile 
       if(!video || !SectionId || !title || !description){
          return res.status(400).json({
            success:false , 
            message:"fill up all the details", 
          });
       }
       
       const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
       

       const NewSubsection = await subSection.create({
          title:title , 
          description:description , 
          videoUrl : uploadDetails.secure_url , 
          timeDuration : `${uploadDetails.duration}` ,   // in  Sec
       })
       console.log("new Section" , NewSubsection);
      //  this is basically the section which is updated with the corresponding sectionID 
       const updatedSection = await Section.findByIdAndUpdate({_id:SectionId} , {
            $push :{
              subSection: NewSubsection._id 
            }
          }    , 
       {new :true} , ).populate("subSection");


       return res.status(200).json({
        succcess:true,
        message:'Sub Section Created Successfully',
        UpdatedSection:updatedSection 
       })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false , 
            message:"unable to create the subsection"
        })
    }
}


// pending : delete and update section understand the whole architecture 
exports.updateSubsection = async (req , res) => {
    try{
        
        
        
      
    }catch(error){
           
    }
}




exports.deleteSubSection = async (req , res) => {
    try{
         const {subSectionId , sectionId} = req.body ;
         await Section.findByIdAndUpdate({_id:sectionId} , {$pull:{subSection:subSectionId}} , {new:true});  //just remove the id of that subsection and then puull it 

         const subSection = await findByIdAndDelete({_id:subSectionId});
         
         if(!subSection){
          return res.status(404).json({
            success:false , 
            message:"subsection not found" , 
          });

          return res.json({
            success: true,
            message: "SubSection deleted successfully",
          })
         }
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })   
    }
} 