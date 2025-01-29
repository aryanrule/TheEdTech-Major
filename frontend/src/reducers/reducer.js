import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";
import courseReducer from '../slices/courseSlice';

const rootReducer = combineReducers({
  auth:authReducer , 
  profile:profileReducer ,
  course:courseReducer ,  
})

export default rootReducer
