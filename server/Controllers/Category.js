

const Category = require('../Models/Category');


const createCategory = async (req , res) => {
     try{
        const {name , description} =  req.body;
        if(!name || !description){
           return res.status(400).json({
            success:false , 
            message:"enter the complete details" , 
           }) 
        }

        //one thing you can check that finding in db is it already present if yes dont make a entry 
        //PENDING

        //lets creatr entry in db 
        const newCategorie = {
            name:name, 
            description:description, 
        } 

        // const response =  await Category.create(newCategorie , {name:true , description:true});
        const response =  await Category.create(newCategorie);
        console.log(response);


        return res.status(200).json({
            success:true,
            message:"Category entry created successfuly "
        })

     }catch(err){
        return res.status(500).json({
            success:false , 
            message:err.message  ,
        })
     }
}

const getAllCategory = async (req , res) => {
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

module.exports = {createCategory , getAllCategory} ;

//given a categoryId now get the courses all of the should be related to that category 
const getCategoryPageDetails = async (req , res) => {
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
