const express = require('express');
const router = express.Router();

const {createCourse  , showAllCourses , editCourse , findCourseByInstructor, deleteCourse , getFullCourseDetails} = require('../Controllers/Course');

const {createCategory , getAllCategory , getCategoryPageDetails} = require('../Controllers/Category');

const { auth, isAdmin, isInstructor, isStudent } = require('../Middlewares/auth');

const {CreateSection  , updateSection , deleteSection}  = require('../Controllers/Section');

const {createSubSection , deleteSubSection}= require('../Controllers/Subsection');

const {createRating} = require('../Controllers/RatingAndReview');



/***************************** COURSE-RELATED ROUTES *******************/
router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/getAllCourses', auth , showAllCourses);
router.post('/editCourse' , auth , isInstructor , editCourse );
router.get('/instructorCourse', auth, isInstructor , findCourseByInstructor);
router.post('/deleteCourse' , auth , isInstructor , deleteCourse);
router.post('/getFullCourseDetails' , auth , isInstructor , getFullCourseDetails);

router.post('/addSection' , auth , isInstructor , CreateSection);
router.post('/updateSection' , auth , isInstructor , updateSection);
router.post('/deleteSection' , auth , isInstructor , deleteSection);


router.post('/addSubsection', auth , isInstructor , createSubSection);
//updateing a subsection is leftover 
router.delete('/deleteSubsection' , auth , isInstructor , deleteSubSection);

/****************** CATEGORY-RELATED ROUTES  *****************/
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/getAllCategories' , getAllCategory );
router.post('/getCategoryPageDetails' , getCategoryPageDetails);



/*************  RATING AND REVIEW ROUTES **************/
router.post('/createRatingReview' , auth , isStudent , createRating);


module.exports = router;
