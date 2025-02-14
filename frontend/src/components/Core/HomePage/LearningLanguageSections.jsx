import React from 'react'
import fileManager from '../../../assets/assets'


const LearningLanguageSections = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
    <img
      src={fileManager.know_your_progress}
      alt=""
      className="object-contain  lg:-mr-32  w-[450px] hover:scale-1 cursor-pointer"
    />
    <img
      src={fileManager.Compare_with_other}
      alt=""
      className="object-contain lg:-mb-10 lg:-mt-0 -mt-12 w-[450px]"
    />
    <img
      src={fileManager.plan_your_success}
      alt=""
      className=" object-contain  lg:-ml-36 lg:-mt-5 -mt-16 w-[450px]"
    />
  </div>
  )
}

export default LearningLanguageSections