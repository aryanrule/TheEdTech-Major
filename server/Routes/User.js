const express = require('express');
const router = express.Router();



const {generateOTP , signup , login, changePassword} = require('../Controllers/Auth');
const {auth} = require('../Middlewares/auth');

/********all AUTHN AND AUTHZ ROUTES ****************/
router.post("/sendOTP", generateOTP);  /*    sending OTP   */

router.post("/signUp" , signup);   /*     signing up    */

router.post("/login",   login);  /*     login      */


///3 routes leftover 
// router.post('/changePassword' , auth ,  changePassword );   this thing is leftover 

// router.post('/changePassword'  ,  changePassword);  /*    change password  */

//now lets understand the things very carefully 


module.exports = router;
