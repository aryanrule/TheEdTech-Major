import grid from "../assets/grid-remove.png";
import BtnG from "../components/Core/HomePage/BtnG";
import TypingAnimation from "../components/Core/HomePage/TypingAnimation";
import fileManager from "../assets/assets";
import InitialLoading from "../components/Core/HomePage/InitialLoading";
import BtnW from "../components/Core/HomePage/BtnW";
import React from "react";


const Home = () => {
  
  return (
    <div className = "">
      
      <div className=" w-[100vw] h-[90vh] bg-soft-gray  flex  justify-between ">


        <div>
          <div
            className="pointer1 w-[60px] h-[60px] rounded-full bg-black translate-x-[160px] translate-y-[40px] border-2 border-white"
            style={{
              backgroundImage: `url(${fileManager.men1})`,

              backgroundPosition: "center",
              backgroundSize: "100%",
              // border:'1px solid white'dc
            }}
          >
            <img
              src={fileManager.cursor}
              className="w-[50px] h-[50px] translate-x-[40px] translate-y-[30px] rotate-180 p-2 "
            />
          </div>

          <div
            className=" relative pointer2 w-[60px] h-[60px]  rounded-full bg-black  translate-x-[160px] translate-y-[300px] border-white border-2"
            style={{
              backgroundImage: `url(${fileManager.women1})`,

              backgroundPosition: "center",
              backgroundSize: "100%",
              // border:'1px solid white'dc
            }}
          >
            <img
              src={fileManager.cursor}
              className="w-[50px] h-[50px]  rotate-90 translate-x-[40px] translate-y-[-30px] p-[5px] "
            />
          </div>
        </div>



        <div>
          <div className="flex items-center justify-center p-3  ">
            <BtnG text={"Become a Instructor"} />
          </div>

          <div className=" flex items-center justify-center ">
            <TypingAnimation />
          </div>

          <div className=" text-center text-sm  text-dark-green ">
            <h5>
              With our online coding courses, you can learn at your own pace,{" "}
              <br /> from anywhere in the world, and get access to a wealth of
              resources, including hands-on <br /> projects, quizzes, and
              personalized feedback from instructors.{" "}
            </h5>
          </div>

          <div className="flex items-center justify-center p-3  gap-5 mt-[40px]">
            <BtnG text={"Learn More"} />
            <BtnW text={"Book a Demo"} />
          </div>
        </div>



        <div>
        <div
            className="w-[60px] h-[60px] relative rounded-full bg-black translate-x-[-160px] translate-y-[40px] border-2 border-white"
            style={{
              backgroundImage: `url(${fileManager.model})`,

              backgroundPosition: "center",
              backgroundSize: "150%",
              // border:'1px solid white'dc
            }}
          >
             <img
              src={fileManager.cursor}
              className="img3 w-[50px] h-[50px] p-[5px] -rotate-90 translate-x-[-30px]  translate-y-[40px] "
            />
          </div>
           
          <div
            className="w-[60px] h-[60px]  rounded-full bg-black  translate-x-[-160px] translate-y-[300px] border-1 border-white"
            style={{
              backgroundImage: `url(${fileManager.model3})`,

              backgroundPosition: "center",
              backgroundSize: "100%",
              // border:'1px solid white'dc
            }}
          >
             <img
              src={fileManager.cursor}
              className="w-[50px] h-[50px] p-[5px] rotate-120 translate-x-[-40px] translate-y-[-30px]"
            />
          </div>

        </div>

      </div>
      
       <div>

           <div className="flex flex-col justify-center items-center  m-[50px]">
               <BtnW  text = {"Explore Features"} />

               <h1 className="m-[10px] font-extrabold text-2xl AnimateType1">
                    Get the skills you need for a <span className=" text-mango-green" >job that is in demand.</span>
               </h1>

               <h4 className=' font-medium AnimateType1'>
               The modern AceEdify is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
               </h4>
           </div>

            
       </div>
        
    </div>
  );
};

export default Home;
