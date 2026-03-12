import React from 'react';
import culture from "../assets/Culturex.png";

const Culture = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-[60px] px-[20px]">
      <div className="w-full h-full flex flex-col justify-center items-center rounded-xl text-center transition-all duration-300 bg-transparent">
        <img
          src={culture}
          alt="Culture Art"
          className="w-full h-full object-cover rounded-[10px] transition-all duration-300"
        />

        <h2 className="mt-[15px] text-[22px] font-bold">Indian Culture</h2>
        <p className="text-[14px] text-[#555]">
          Discover the beauty and richness of Indian cultural heritage.
        </p>
      </div>
    </div>
  );
};

export default Culture;
