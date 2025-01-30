
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step :  1, 
    course : null  , 
    editCourse:false  , // inittially edit course is not true 
}

const courseSlice = createSlice({
    name : "course", 
    initialState , 
    reducers:{
        setStep:(state , action)=>{
            state.step = action.payload  
        } , 
        setCourse:(state , action)=>{
            state.course = action.payload 
        } , 
        setEditCourse:(state , action) => {
            state.editCourse = action.payload
        }
    }
})


// two things to export 
// one is action reducers and nex
export const {setStep, setCourse , setEditCourse} = courseSlice.actions;
export default courseSlice.reducer ;