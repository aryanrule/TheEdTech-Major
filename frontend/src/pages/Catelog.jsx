import React, { useEffect, useState } from 'react'
import { getCatalogPageData } from '../services/operations/PageAndComponentData'
import { useParams } from 'react-router-dom'
import { fetchAllCategories } from '../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import Error from './Error';
import Course_slider from '../components/Core/Catalog/Course_slider';
const Catelog = () => {
  
  const {catelogName} = useParams();
  const [categoryId , setCategoryId] = useState(null);
  const {loading}= useSelector((state) => state.profile);
  const [catalogPageData , setCatlogPageData] = useState(null);
  const [active  , setActive] = useState(1);

  const findAllCategories = async () => {
      try{   
          const res = await fetchAllCategories();
          // console.log(res);
          //this while res is an array of diffrent objects containing name of category n its id 
          // now i need to find the category id whose name is equal to this id 
          // const filterArray = res.filter((cat) => cat.name.split(" ").join("-").toLowerCase() === catelogName);
          // console.log(filterArray);
          // console.log(filterArray[0]._id);

          const category_Id = res.filter((cat) => cat.name.split(" ").join("-").toLowerCase() === catelogName)[0]._id;
          console.log(category_Id);
          setCategoryId(category_Id);          
      }catch(err){
        console.log("coudnt fetch categories" , err);
      }
  }


  useEffect(() => {
    console.log(catelogName);
    findAllCategories();
  } , [catelogName])



  //  not its time to find all the course asoociated with this castegory as well as not belongs to this categpry as well as most selling courses;
  const findcategoryPageDetails = async () => {
      try{
        const res = await getCatalogPageData(categoryId);
        console.log(res);
        setCatlogPageData(res);
      }catch(error){
          console.log("cannot fetch catologPage ", error);
      }
  }


  useEffect(()=> {
      if(categoryId){
        findcategoryPageDetails();
        console.log(catalogPageData);
        console.log("all courses in selected categpry"   , catalogPageData?.data?.selectedCategory?.courses);
      }
     
  } ,[categoryId]);

  if(loading || !catalogPageData){
    return (
      <div>
          loading....
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }


  return (
    <>
        {/* this is the hero section */}
        <div className=' box-content bg-mango-green  '>
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
             <p className='text-sm text-richblack-300'>
                 {`Home / Catelog /`}
                 <span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span>
             </p>
             <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
            </p>
             <p className="text-3xl text-richblack-5" >
                  {catalogPageData?.data?.selectedCategory?.description}
             </p>
          </div>
        </div>

        {/* section-1  courses of your category (SELECTED COURSE)*/}
        <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
            <div className='section_heading'>Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                  <p className={`px-4 py-2 ${
                  active ===  1 ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50" } `}
                onClick={() => setActive(1)}
                >
                  Most Popular 
                  </p>

                  <p className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}>
                     New
                  </p>
            </div>

            <div>
                <Course_slider Courses = {catalogPageData?.data?.selectedCategory?.courses}/>
            </div>

         


          
            {/* section-2 (DIFFRENT CATEGORY COURSES) */}
                        

            {/* SECTION-3 FOR MOST SELLING COURSES*/}
        </div>

        
      

    </>
  )
}

export default Catelog