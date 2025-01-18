import React, { useEffect, useRef } from 'react'; 
import Typed from 'typed.js';

const TypingAnimation = () => {
  const el = useRef(null);  

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Coding Skills"],  
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []); 

  return (
    <div>
      <h1 className='font-bold text-[30px] gap-2'>
        Empower Your Future with <span ref={el} className='text-transparent bg-clip-text bg-gradient-to-r from-mango-green to-lemon-yellow text-shadow'></span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
