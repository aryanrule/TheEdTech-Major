

const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = async (req , res , next) => {
    try{
       
       const token = req.body.token || req.cookies.token  || req.header("Authorization")?.replace("Bearer ", ""); //and possibly other wats too header se nikl laao 

       if(!token){
          return res.status(401).json({
             success:false , 
             message:'token not found' , 
          })
       }

       try{
          const decode = jwt.verify(token,process.env.JWT_SECRET);
          console.log(decode);
          // 

          //ok lets solve it again 
          console.log("whats inside req" , req.user);
          req.user = decode;

          //req ke andr user feild bnaiye and then passing it to the nextmiddleware or the next controller 
          //jin teen cheezo se payload bna tha vo teeno miljaengi 
        //   {   //this was actually the payload that i have created 
        //     email: 'aryan@3124',
        //     id: '6731d6de10c25a2952758506',
        //     accountType: 'Student',
        //     iat: 1731319622,
        //     exp: 1731326822
        //   }   //remember 


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
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                message:"thi is a protected route for student only "
            })
        }
        next();
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
   
} 


exports.isInstructor = async (req, res , next) => {
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                message:"this is the protected route for Inctructor only"
            })
        }
        next();
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
}


exports.isAdmin = async (req, res , next) => {
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                message:"this is the protected route for "
            })
        }
        next();
    }catch(e){
        return res.status(500).json({
            message:"user role cannot be verified", 
        })
    }
}