import React from 'react';
import arms from "../assets/arms.png";

const Homecontact = () => {

  return (
    <div
      id="home-contact-container"
      className="relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-[400ms] ease-in-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
    >
      <img 
        id="home-contact-image"
        src={arms} 
        alt="Robotic Arm Sketch" 
        className="w-full object-cover min-h-[250px] md:h-auto block opacity-[0.85] transition-transform duration-[400ms] ease-in-out"
      />

      <div id="home-contact-overlay" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
        <h1 id="home-contact-text" className="text-3xl md:text-5xl lg:text-[3.5rem] text-[#4a3a35] mb-4 md:mb-6 font-bold drop-shadow-[2px_2px_6px_rgba(0,0,0,0.3)]">
          Having Trouble? Need Any Help?
        </h1>

        <button
          id="home-contact-button"
          className="py-3 px-8 text-sm md:text-lg bg-[#8b5a2b] font-semibold text-white border-none rounded-md cursor-pointer transition-all duration-[350ms] ease-in-out shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#6e4420] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_25px_rgba(0,0,0,0.45)]"
          onClick={() => console.log('Button Clicked!')}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Homecontact;
