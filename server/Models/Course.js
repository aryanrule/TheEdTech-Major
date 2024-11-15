
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    whatYouWillLearn: {   // corrected typo
        type: String,  // fixed 'type: true' to 'type: String'
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
        
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],  // #python #ML
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
});

module.exports = mongoose.model("Course", CourseSchema);
