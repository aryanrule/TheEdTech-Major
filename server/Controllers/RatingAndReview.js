
const RatingAndReview = require('../Models/RatingandReview');

exports.createRating = async (req , res) => {
     try{
         

     }catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
     }    
}




