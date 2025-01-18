import React from 'react'

const BtnG = ({text}) => {
  return (
    
       <button className="bg-mango-green text-lemon-yellow hover:text-mango-green hover:bg-white px-4 py-2  text-sm  text-center rounded-xl transition-all duration-500 ease-in-out"
        style={{ minWidth: '80px', minHeight: '30px' }}
        >
        {text} 
       </button>
    
  )
}

export default BtnG