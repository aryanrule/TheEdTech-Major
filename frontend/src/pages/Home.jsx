import grid from "../assets/grid-remove.png";
import BtnG from "../components/Core/HomePage/BtnG";
import TypingAnimation from "../components/Core/HomePage/TypingAnimation";
import fileManager from "../assets/assets";
import InitialLoading from "../components/Core/HomePage/InitialLoading";
import BtnW from "../components/Core/HomePage/BtnW";
import React from "react";
import IconBtn from "../components/Common/IconBtn";
import { TypeAnimation } from "react-type-animation";
import Qualities from "../components/Core/HomePage/Qualities";
import LearningLanguageSections from "../components/Core/HomePage/LearningLanguageSections";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../components/Common/Footer";


const Home = () => {
  return (
    <div className="">
      <div className=" w-[100vw] h-[90vh] bg-soft-gray z-[7] flex  justify-between ">
      {/* <Grid/> */}
      <div className="mt-8">
          <div
            className="pointer pointer1 w-[60px] h-[60px] rounded-full bg-black translate-x-[220px] translate-y-[40px] border-2 border-white"
            style={{
              backgroundImage: `url(${fileManager.men1})`,
              backgroundPosition: "center",
              backgroundSize: "100%",
              // border:'1px solid white'dc
            }}
          >
            <img
              src={fileManager.cursor}
              className="  w-[50px] h-[50px] translate-x-[40px] translate-y-[30px] rotate-180 p-2 "
            />
          </div>

          <div
            className="pointer pointer2 relative w-[60px] h-[60px]  rounded-full bg-black  translate-x-[220px] translate-y-[300px] border-white border-2"
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

        <div className="mt-20 z-[100]">
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

        <div className="mt-8 relative">
          <div
            className="pointer pointer3 w-[60px] h-[60px] relative rounded-full bg-black translate-x-[-220px] translate-y-[40px] border-2 border-white"
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
            className="pointer  pointer4 w-[60px] h-[60px]  rounded-full bg-black  translate-x-[-220px] translate-y-[300px] border-1 border-white"
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

      <div className=" h-[100vh] w-[100vw] ">
        <div className="scroll1 flex flex-col justify-center items-center  m-[50px]">
          <BtnW text={"Explore Features"} />

          <h1 className="m-[10px] font-extrabold text-2xl AnimateType1">
            Get the skills you need for a{" "}
            <span className=" text-mango-green">job that is in demand.</span>
          </h1>

          <h4 className=" font-bold">
            The modern AceEdify is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </h4>
        </div>

        <div className="h-[300px] w-[500px] bg-yellow-400  -translate-y-[150px] rounded-full blur-[90px] opacity-30 "></div>

        <div className="translate-x-[200px] -translate-y-[100px]">
          <div className="flex flex-col w-[30%]">
            <h1 className=" font-bold text-[30px]">
              Unlock your{" "}
              <span className="text-mango-green font-extrabold">
                coding potential
              </span>{" "}
              with our online courses.
            </h1>
            <p className="text-lg  font- sans">
              Our courses are designed and taught by industry experts who have
              years of experience in coding and are passionate about sharing
              their knowledge with you.
            </p>

            <div className="mt-3">
              <IconBtn text="Try it Yourself">
                <FaArrowRight />
              </IconBtn>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-[500px]  bg-pink-200 translate-x-[1200px] -translate-y-[100px] rounded-full blur-[90px] opacity-30 "></div>
      </div>

      <div className="h-[100vh] w-[100vw] flex  items-center justify-evenly gap-[50px]">
        <div>
          <Qualities />
        </div>

        <div className="h-[300px] w-[400px] bg-blue-200  blur-[90px]"></div>

        <div className="absolute z-20">
          <video
            src={fileManager.student1}
            width="600px"
            className=" translate-x-[300px]  translate-y-[30px]"
            autoPlay
            muted
            loop={true}
          />
          <div className="w-[350px] h-[100px] bg-mango-green  translate-x-[450px] relative flex  items-center  justify-center gap-[20px]">
            <div className=" flex  items-center justify-center gap-4 ">
              <h1 className="text-[30px] text-white ">10</h1>
              <p className="text-white opacity-50">
                Years <br /> Experience{" "}
              </p>
            </div>

            <div className="bg-white h-[40px] w-[3px]"></div>
            <div className=" flex  items-center justify-center gap-4 ">
              <h1 className="text-[30px] text-white ">250</h1>
              <p className="text-white opacity-50">
                Types of
                <br />
                Courses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[80vh] w-[100vw] flex flex-col items-center gap-2">
        <h1 className="font-bold text-[30px]">
          Your swiss Knife for{" "}
          <span className="text-mango-green">learning any language</span>
        </h1>
        <p className="">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>

        <div className="h-[500px] w-[70%]  mt-[40px]">
          <LearningLanguageSections />
        </div>
      </div>

      <div className=" gap-[200px] flex  item-center  justify-center h-[80vh] w-[100vw] bg-mango-green mt-[40px]">
        <div className="relative bg-white h-[400px] w-[400px] mt-[70px]">
          <img
            src={fileManager.instructor}
            className="absolute h-[400px]  w-[400px] translate-x-[30px] translate-y-[30px] "
          />
        </div>


        <div className="flex flex-col w-[30%] mt-[200px]">
          <h1 className=" font-bold text-[30px] text-white">
           Become{" "} <div className=" text-blue-200">Instructor ?</div> 
          </h1>
          <p className="text-lg  font-sans  text-white ">
          Instructors from around the world teach millions of students on AceEdify. We provide the tools and skills to teach what you love.
          </p>

          <div className=" flex items-center mt-6">
              <BtnW text="Start Teaching Now"/>
          </div>
        </div>
      </div>


      <div className="w-[100vw] h-[50vh]">
        {/* here only review slider is leftover  */}
        
      </div>


      {/* here is the footer */}

      <Footer/>
      

    </div>
  );
};

export default Home;
