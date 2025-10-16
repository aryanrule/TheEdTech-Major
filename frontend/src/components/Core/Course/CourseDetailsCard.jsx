import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../slices/cartSlice'

const CourseDetailsCard = ({course , setConfirmationModal}) => {
    
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }
    
    const handleAddtoCart = ()=> {
          //validations 
          if( user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
               toast.error("you are an instructor cannnot buy the course");
               return ;
          }
          if(!token){
            // means you are not logged in 
            setConfirmationModal({
                text1 : "you are not logged in!" , 
                text2 : "please login to add to the cart" , 
                btn1Text :"login" , 
                btn2Text : "cancel" , 
                btn1Handler: () => navigate("/login") , 
                btn2Handler : () => setConfirmationModal(null)
            })

          }
          if(token){
            // add to the cart
            dispatch(addToCart(course));
            
          }
    }


    const handleBuyCourse = () => {
        console.log("buy krlo");
    }

    const {cart} = useSelector((state)=> state.cart);
    const {total} = useSelector((state) => state.cart); 

    useEffect(() => {
        console.log(cart);
        console.log(total);
    } , [cart]);




    
  const {
    thumbnail : thumbnailImage , 
    price : currentPrice} = course;

  return (
    <>
       <div
        className={`flex flex-col gap-4 rounded-md bg-mango-green p-4 text-richblack-5`}
       >

         <img
            src={thumbnailImage}
            alt={course?.courseName}
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
         />

        <div className='px-4'>
           <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {currentPrice}
           </div>
           
           <div className="flex flex-col gap-4">

              {/* here lots of changes are requried  */}
               <button 
               onClick={user && user?.studentsEnrolled?.includes(user._id) ? () => navigate('/dashboard/enrolled-courses') : handleBuyCourse}
               className='yellowButton'
               >
                    {user && user?.studentsEnrolled?.includes(user._id) ? "Go to courses" : "Buy now"}
               </button>
               
               {
               (!user || !course?.studentsEnrolled.includes(user._id)) &&
               <button              
               onClick={handleAddtoCart}
               className='blackButton'>        
                    Add to cart
               </button>
               }
              
           </div>

           <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
             <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>

            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
               {course?.instructions?.map((item , index)=>{
                  return (
                    <p className={`flex gap-2`} key = {index}>
                         <BsFillCaretRightFill/>
                         <span>{item}</span>
                    </p>
                  )
               })}
            </div> 
          </div>
         
         {/* handle share is leftover here  */}
         <div className="text-center">
            <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
            onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share  
            </button>
         </div>

        </div>         
       </div>
    </>
  )
}

export default CourseDetailsCard