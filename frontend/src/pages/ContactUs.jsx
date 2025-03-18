import React from "react";
import fileManager from "../assets/assets";
import Contact from "../components/Common/Contact";

const ContactUs = () => {

   
  const contactInfo = [
    {
      title: "Chat on us",
      description: "Our friendly team is here to help.",
      contact: "@mail address",
      icon: fileManager.chat,
    },
    {
      title: "Visit us",
      description: "Come and say hello at our office HQ.",
      contact: "aryansharma99107@gmail.com",
      icon: fileManager.location,
    },
    {
      title: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      contact: "+91 99107 34781",
      icon: fileManager.telephone,
    },
  ];


  return (
    <div className="h-full w-[100vw] flex  justify-evenly p-8">
      
      <div className="h-full w-[500px] gap-[80px] p-4 mt-[80px] border-dashed border-mango-green border-2  flex flex-col   rounded-xl">
        {contactInfo.map((item, index) => (

          <div key = {index}  className="flex item-center">
            <img  src = {item.icon}  className="h-[50px] mr-[8px]" />
            <div className="flex flex-col">
              <h1 className="font-bold text-lg ">{item.title}</h1>
              <h4 className="font-medium ">{item.description}</h4>
              <p className="text-lg ">{item.contact}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-[30px] font-bold   mt-[50px] bg-[linear-gradient(to_right,#833AB4,#FD1D1D,#FCB045)] text-transparent bg-clip-text">Got a Idea? We’ve got the skills. Let’s team up</h1>
        <p className="text-[20px] text-lg">Talk us more about yourself and what you’re got in mind.</p>
    
        <div>
          <Contact />
        </div>

      </div>

       
       {/* reviewSlider pending  */}
       


       {/* footer */}

    </div>
  );
};

export default ContactUs;
