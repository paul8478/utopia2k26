import React from "react";
import ScrollReveal from "./ScrollReveal";

const sponsor1 = "/assets/gdgc.png";
const sponsor2 = "/assets/mckv.png";

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

  // Duplicate for seamless loop
  const allSponsors = [...sponsors, ...sponsors];

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

      {/* SPONSORS MARQUEE */}
      <section className="relative overflow-hidden bg-transparent mt-[30px] pb-20 w-full">
        <div className="flex animate-marquee py-[14px] [animation-duration:3s] md:[animation-duration:5s]">
          
          {[...allSponsors, ...allSponsors].map((sponsor, index) => (
            <div
              key={index}
              className="group relative shrink-0 h-[150px] w-[150px] lg:h-[170px] lg:w-[170px]
            
              overflow-hidden
              flex justify-center items-center
              transition-all duration-300
              hover:-translate-y-[10px] hover:scale-105
              hover:shadow-[0px_15px_30px_rgba(0,0,0,0.15)]
              cursor-pointer mx-5 lg:mx-10"
            >
              
              {/* Background Image */}
              <img
                src="/assets/spback.png"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover opacity-70 
                transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay (glass dark effect) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

              {/* Logo */}
              <img
                src={sponsor}
                alt={`Sponsor ${(index % sponsors.length) + 1}`}
                className="relative z-10 w-[70%] h-auto 
                transition-all duration-300 
                group-hover:scale-110"
              />
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Sponsor;