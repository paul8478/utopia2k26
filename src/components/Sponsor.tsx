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

  // Double the sponsors array for seamless looping
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

      {/* SPONSOR LOGOS — Infinite seamless marquee */}
      <section className="relative overflow-hidden bg-transparent mt-[30px] pb-20 w-full">
        <div className="flex animate-marquee py-[14px] [animation-duration:20s] md:[animation-duration:35s]">
          {allSponsors.map((sponsor, index) => (
            <div
              key={index}
              className="shrink-0 h-[150px] w-[150px] lg:h-[170px] lg:w-[170px] bg-white border border-black/65 rounded-[20px] flex justify-center items-center transition-transform duration-300 hover:-translate-y-[10px] hover:shadow-[0px_15px_30px_rgba(0,0,0,0.15)] cursor-pointer mx-5 lg:mx-10"
            >
              <img
                src={sponsor}
                alt={`Sponsor ${(index % sponsors.length) + 1}`}
                className="w-[80%] h-auto rounded-[20px]"
              />
            </div>
          ))}
          {/* Third copy to guarantee no gap on ultra-wide screens */}
          {allSponsors.map((sponsor, index) => (
            <div
              key={`extra-${index}`}
              aria-hidden="true"
              className="shrink-0 h-[150px] w-[150px] lg:h-[170px] lg:w-[170px] bg-white border border-black/65 rounded-[20px] flex justify-center items-center transition-transform duration-300 hover:-translate-y-[10px] hover:shadow-[0px_15px_30px_rgba(0,0,0,0.15)] cursor-pointer mx-5 lg:mx-10"
            >
              <img
                src={sponsor}
                alt={`Sponsor ${(index % sponsors.length) + 1}`}
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
