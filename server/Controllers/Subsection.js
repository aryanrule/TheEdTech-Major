//for a section create subsection 
const Section = require('../Models/Section');
const { UploadImageToCloudinary } = require('../Utils/uploadToCloud');
require('dotenv').config();
const subSection = require('../Models/Subsection');
const Subsection = require('../Models/Subsection');


exports.createSubSectionSection = async (req , res) => {
    try{
       const {SectionId , title , timeDuration , description , } = req.body;
       if(!SectionId || !title ||  !timeDuration || !description ){
           return res.status(400).json({
             success:true , 
             message:"fill up all the details", 
           });
       }
       const video = req.files.VideoFile;  //give the name videoFile 
       if(!video){
          return res.status(400).json({
            success:true , 
            message:"fill up all the details", 
          });
       }
       const uploadDetails = await UploadImageToCloudinary(video , process.env.FOLDER_NAME);
       
       const subsectionDetails = {
        title:title , 
        timeDuration :timeDuration , 
        description:description , 
        videoUrl:uploadDetails.secure_url,
       }
       const updatedSection  = await Section.findByIdAndUpdate({_id:SectionId} ,{ $push :{subSection:subsectionDetails._id}} , {new:true});

       return res.status(200).json({
        succcess:true,
        message:'Sub Section Created Successfully',
        updatedSection,
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
        const {sectionId  , title , description} = req.body;
        const subSection = await Subsection.findById(sectionId);
        
        
      
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