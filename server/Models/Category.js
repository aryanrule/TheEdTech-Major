const mongoose = require('mongoose');

//you can say category or tag 

const categorySchema = new mongoose.Schema({
    name:{
        type:String , 
        required:true , 
    } , 
    description:{
        type:String , 
    } , 
    course:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:'Courses', 
    } , 
});

module.exports = mongoose.model("Category", categorySchema);
