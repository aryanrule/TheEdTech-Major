

const Category = require('../Models/Category');
const Course = require('../Models/Course');


exports.createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({
          success: false,
          message: "Please enter complete details",
        });
      }
  
      // Check if the category already exists
      const existingCategory = await Category.findOne({ name: name });
      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category already exists",
        });
      }
  
      // Create entry in the database
      const newCategory = {
        name: name,
        description: description,
      };
  
      const response = await Category.create(newCategory);
      console.log(response);
  
      return res.status(201).json({
        success: true,
        message: "Category entry created successfully",
        category: response,  // Include created category details in response
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  



exports.getAllCategory = async (req , res) => {
    try{
        //i ll get a obbject of all the tags and its dis
        const AllCategories = await Category.find({} , {name:true , description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            AllCategories,
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:e.message,
        })
    }
}


//given a categoryId now get the courses all of the should be related to that category 
// LOT OF THINGS ARE LEFTOVER HERE 
// here differes categories and mostSelling courses of it is pending 

exports.getCategoryPageDetails = async (req , res) => {
      try {
          const {categoryId} = req.body;

          // now get all the courses asoociated with this categpry
          // this will give me all the courses associated with this course
          const selectedCategory = await Category.findById(categoryId)
          .populate({
            path : "courses" , 
            match:{status:"Published"} , 
            populate:"ratingAndReviews"  , 
            populate:"instructor" , 
          }).exec();

          console.log("Selected Course" , selectedCategory);
          if(!selectedCategory){
            console.log("No courses found for the selected category.")
            return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
            });
          }

          res.status(200).json({
            success:true , 
            data:{
              selectedCategory , 
            }
          })

          

      }catch(error){
        console.log("error in in getCategoryPageDetails",error);
      }
}





