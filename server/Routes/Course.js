const express = require('express');
const router = express.Router();

const {createCourse  , showAllCourses , editCourse} = require('../Controllers/Course');

const {createCategory , getAllCategory , getCategoryPageDetails} = require('../Controllers/Category');

const { auth, isAdmin, isInstructor } = require('../Middlewares/auth');

const {CreateSection  , updateSection , deleteSection}  = require('../Controllers/Section');

const {createSubSectionSection , deleteSubSection}= require('../Controllers/Subsection');

/***************************** COURSE-RELATED ROUTES *******************/
router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/getAllCourses', auth , showAllCourses);
router.post('/editCourse' , auth , isInstructor , editCourse );

router.post('/addSection' , auth , isInstructor , CreateSection);
router.post('/updateSection' , auth , isInstructor , updateSection);
router.post('/deleteSection' , auth , isInstructor , deleteSection);


router.post('/addSubsection', auth , isInstructor , createSubSectionSection);
//updateing a subsection is leftover 
router.delete('/deleteSubsection' , auth , isInstructor , deleteSubSection);

/****************** CATEGORY-RELATED ROUTES  *****************/
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/getAllCategories' , getAllCategory );
router.get('/getCategoryPageDetails' , getCategoryPageDetails);


module.exports = router;
