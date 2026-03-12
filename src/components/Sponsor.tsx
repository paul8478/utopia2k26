import React from "react";
import ScrollReveal from "./ScrollReveal";

import sponsor1 from "../assets/gdgc.png";
import sponsor2 from "../assets/mckv.png"; 

const Sponsor = () => {
  const sponsors = [
    sponsor1,
    sponsor2,
    sponsor2,
    sponsor1,
    sponsor2,
    sponsor1,
    sponsor2,
    sponsor1,
  ];

  return (
    <div>
      {/* TITLE */}
      <section className="py-10 px-10 md:px-20 relative">
        <div className="max-w-6xl mx-auto flex justify-center">
          <ScrollReveal>
            <h2 className="text-[8vw] md:text-[3vw] font-serif leading-[0.95] tracking-[-0.02em] text-center mb-0">
              Our Esteemed Event
              <span className="text-primary italic"> Sponsors</span>.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* SPONSOR LOGOS */}
      <section className="relative overflow-hidden bg-transparent flex items-baseline justify-center mt-[30px] px-4 pb-20">
        <div className="relative z-10 text-center w-auto grid grid-cols-2 lg:grid-cols-[repeat(4,170px)] gap-10 lg:gap-[80px] justify-center items-center py-[14px]">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="h-[150px] w-[150px] lg:h-[170px] lg:w-[170px] bg-white border border-black/65 rounded-[20px] flex justify-center items-center transition-all duration-300 hover:-translate-y-[10px] hover:scale-105 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.15)] mx-auto"
            >
              <img
                src={sponsor}
                alt={`Sponsor ${index + 1}`}
                className="w-[80%] h-auto rounded-[20px]"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sponsor;
