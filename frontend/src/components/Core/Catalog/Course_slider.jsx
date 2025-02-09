// import React, { useEffect, useState } from "react"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"

// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// // import "../../.."
// // Import required modules
// import { FreeMode, Pagination } from "swiper"


// import Course_card from './Course_card'


// const Course_slider = ({Courses}) => {
//   return (
//     <>
//           {Courses?.length ? (
//             <Swiper
//              slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="max-h-[30rem]"
//             >
//               {
//                 Courses?.map((course , index) => (
//                     <SwiperSlide  key = {index}>
//                        <Course_card course = {course} Height={"h-[250px]"} />
//                     </SwiperSlide>
//                 ))
//               }
//             </Swiper>
//           ) : ( <p className="text-xl text-richblack-5">No Course Found</p>)}
//     </>
//   )
// }

// export default Course_slider


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import Course_card from "./Course_card";


const Course_slider = ({ Courses }) => {
 


  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          pagination={{ clickable: true }} // Added pagination
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },  // Small screens
            768: { slidesPerView: 2 },  // Tablets
            1024: { slidesPerView: 3 }, // Desktops
          }}
          className="max-h-[30rem]"
        >
          {Courses.map((course) => (
            <SwiperSlide key={course.id || course.name}> 
              <Course_card course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default Course_slider;
