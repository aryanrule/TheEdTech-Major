import React, { useEffect, useRef, useState } from 'react'

const Tab = (props) => { 
  const tab_data = props.tab_data;
  const setField = props.setField;
  const field = props.field;
  const [active , setActive] = useState(false);
  const B1 = useRef(null);
  const B2 = useRef(null);

  const buttonHandler  = (tabName ,  e) => {
    setField(tabName);
    setActive((prev) => !prev);
    
    // console.log(prev)
  }

  useEffect(() => {
    console.log(active);
    console.log(field);
    if(!active){
      B1.current.style.background = '#004838'
      B1.current.style.color = 'white'
      B2.current.style.background = 'white'
      B2.current.style.color = 'black'
    }
    if(active){
      B2.current.style.background = '#004838'
      B2.current.style.color = 'white'
      B1.current.style.background = 'white'
      B1.current.style.color = 'black'
    }
  },[active]);

  return (
    <div className='h-[60px] flex items-center gap-3  border-2 p-3 w-[350px] rounded-full bg-soft-gray'>
        {
            tab_data.map((tab) => (
            <button
                onClick={()=> buttonHandler(tab?.tabName)}
                ref={tab.id == '1' ? B1 : B2}
                className = {  `font-bold text-lg  h-[40px] w-[150px] rounded-full border-2`}
                // className = {!active && tab.id === 1 ? "font-bold text-lg bg-mango-green text-white h-[40px]" : ""}
                // className='font-bold text-lg bg-mango-green text-white h-[40px] w-[150px] rounded-full border-2'    
                key = {tab.id}
                >
                {tab?.tabName}
            </button>
           ))
        }
    </div>
  )
}

export default Tab