

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],   // cart handles what you are buying 
    
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0 ,    // total amount
    
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,   // total items
};



const cartSlice = createSlice({
    name : "cart" , 
    initialState: initialState , 
    reducers : {
        
        //add to cart 
        addToCart : (state , action) => {
            
            const course = action.payload   // this will be ypu actual course not a id 
            const index = state.cart.findIndex((item) => item._id === course._id);
            
            if(index >= 0 ){
                return toast.error("Course already Addedd");
            }
            // one validation what if cpurse is already present in the cart 
            

            
            state.cart.push(course)

            state.totalItems++;
            
            state.total += course?.price

            localStorage.setItem("cart" , JSON.stringify(state.cart))
            localStorage.setItem("total" , JSON.stringify(state.total))
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))

            toast.success("Added to cart");
        } , 


        //removefromCart 
        removeFromCart : (state , action)=> {
           const courseId = action.payload;

           const index = state.cart.findIndex((item) => item._id === courseId);

           if(index >= 0){
              // means i found the index 
              state.totalItems--;
              state.total -= state.cart[index].price;     
              state.cart.splice(index , 1);


              localStorage.setItem("cart" , JSON.stringify(state.cart))
              localStorage.setItem("total" , JSON.stringify(state.total))
              localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))

              toast.success("Course removed");
              
           }
        } 


        // resetCart 
    }
});



export const {addToCart  , removeFromCart} = cartSlice.actions;
export default cartSlice.reducer

//export them 




