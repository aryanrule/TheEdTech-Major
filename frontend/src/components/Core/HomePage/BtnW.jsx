import React from 'react'

const BtnW = ({text}) => {
  return (
    <div>
        <button
        className="bg-white  text-mango-green hover:text-lemon-yellow hover:bg-white  text-sm px-4 py-2 text-center rounded-xl transition-all duration-500 ease-in-out"
        style={{ minWidth: '80px', minHeight: '30px' }}
        >
        {text}
      </button>
    </div>
  )
}

export default BtnW