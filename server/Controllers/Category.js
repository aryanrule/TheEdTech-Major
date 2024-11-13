

const Category = require('../Models/Category');

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
        const allTags = await Category.find({} , {name:true , description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//given a categoryId now get the courses all of the should be related to that category 
exports.getCategoryPageDetails = async (req , res) => {
    try{  
        const CategoryId = req.body;

        const selectedCategory = await Category.findById({CategoryId}).populate("courses").exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        //now get the courses with all differecnt categories 
        const differentCategory = await Category.find({_id:{$ne:CategoryId}}).populate("courses").exec();

        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategory,
            },
        });

    }catch(e){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


