const express = require('express');
const router = express.Router();
const {UpdateProfilePicture  , UpdateProfile , deleteAccount , getUserAllDetails , getUsersEnrolledCourses} = require('../Controllers/Profile');
const {auth} = require('../Middlewares/auth');


/********************************* PROFILE ROUTES  ***********************/
router.post('/updateProfile' , auth ,   UpdateProfile);

router.put('/updateProfilePicture'  ,  auth ,  UpdateProfilePicture);

router.delete('/deleteAccount' , auth , deleteAccount);

router.get('/getuserDetails' , auth , getUserAllDetails);

router.get('/enrolledCourses' , auth  , getUsersEnrolledCourses);   //retest this after enrolling in the course 





module.exports = router;