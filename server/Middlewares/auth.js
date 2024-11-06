

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req , res , next) => {
    try{
       const token = req.body.token || req.cookies.token ;  //and possibly other wats too header se nikl laao 
       if(!token){
          return res.status(401).json({
             success:false , 
             message:'tkoken not found' , 
          })
       }

       try{
          const decode = jwt.verify(token,process.env.JWT_SECRET);
          console.log(decode);

          //ok lets solve it again 
          req.user = docode;
       }catch(e){
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
       }

       next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}



//now lets build a 
exports.isStudent = async (req , res , next) => {
    try{
        if(res.user.role !== 'Student'){
            return res.status(401).json({
                message:"thi is a protected route for student only "
            })
        }
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
} 


exports.isInstructor = async (req, res , next) => {
    try{
        if(res.user.role !== 'Instructor'){
            return res.status(401).json({
                message:"this is the protected route for Inctructor only"
            })
        }
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
}


exports.isAdmin = async (req, res , next) => {
    try{
        if(res.user.role !== 'Admin'){
            return res.status(401).json({
                message:"this is the protected route for "
            })
        }
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
}