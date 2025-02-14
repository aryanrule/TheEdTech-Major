import React from 'react'
import fileManager from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className=' flex flex-col items-center gap-5   h-[60vh] w-[100vw] bg-mango-green'>
           <h1 className='text-white mt-[40px]  text-bold  text-[20px]' >About Us</h1>
           <h1 className='text-white font-bold text-[30px]'>Driving Innovation in Online Education for a <span className=' text-blue-300'> Brighter Future</span> </h1>
            

            <div className=' w-[700px]'>
            <p  className='text-center text-white'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future  by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>

            <div className=' flex m-[30px] gap-[40px] '>
                  <img  src={fileManager.aboutus1}/>
                  <img src={fileManager.aboutus2}/>
                  <img src={fileManager.aboutus3}/>
            </div>
      </div>

      <div className='h-[100vh] w-[100vw] mt-[250px] flex flex-col  items-center   '>
           <div className=' w-[700px] '>
               <h1 className='text-mango-green text-center text-[25px] font-bold'> <span>"</span>  We are passionate about revolutionizing the way we learn. Our innovative platform  <span className=' text-linier from-'>combines technology</span> ,  <span>expertise</span> , and community to create an <span>unparalleled educational experience.</span></h1>
           </div>

           <div className='h-[1px] w-[100vw] bg-mango-green mt-[50px] opacity-30'></div>

           <div className='flex  items-center mt-[150px]  justify-between  gap-[150px]'>
               <div className='w-[600px]'>
                    <h1 className="bg-[linear-gradient(to_right,#833AB4,#FD1D1D,#FCB045)] text-transparent bg-clip-text text-4xl font-bold">
                    Our Founding Story
                    </h1>
                 
                    <p className='mt-[30px] font-medium text-[15px]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className='mt-[20px] font-medium text-[15px]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
               </div>

               
                <div className=' h-[300px] w-[300px] bg-pink-400 blur-[90px]'></div>

                
           </div>
      </div>

      <div className='w-[100vw] h-[60vh] flex items-center justify-center gap-[40px] '>
               <div className='flex flex-col items-center justify-center w-[35%]'>
                 <h1 className='bg-[linear-gradient(to_right,#E65C00,#F9D423)] text-transparent bg-clip-text text-4xl font-bold'>Our Vision</h1>
                 <p className='mt-[30px] font-medium text-[18px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
               </div>

               <div className='flex flex-col items-center justify-center w-[40%]'>
                 <h1 className='bg-[linear-gradient(to_right,#1FA2FF , #A6FFCB)] text-transparent bg-clip-text text-4xl font-bold'>Our Vision</h1>
                  <p className='mt-[30px] font-medium text-[18px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
               </div>
      </div>




          
    
    </div>
  )
}

export default About