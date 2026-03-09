"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { time: "09:00 AM", title: "Opening Ceremony", img: "/src/assets/1.jpg" },
  { time: "10:30 AM", title: "Cultural Performance", img: "/src/assets/2.jpg" },
  { time: "01:00 PM", title: "Lunch Break", img: "/src/assets/3.jpg" },
  { time: "02:30 PM", title: "Cultural Programme", img: "/src/assets/4.jpg" },
  { time: "05:00 PM", title: "Main Event", img: "/src/assets/5.jpg" }
];


export default function ScheduleSection() {

  const container = useRef<HTMLDivElement>(null);
  const bead = useRef<HTMLDivElement>(null);

  useEffect(() => {
      
    gsap.to(bead.current, {
      rotateX: -360*60,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=14000",
        scrub: true
      }
    });

  }, []);

  const radius = 720;
  const angleStep = 360 / events.length;

  return (

    <div ref={container} className="min-h-[800vh]">

     
      <div className="sticky top-0 h-screen flex items-center justify-center">

        <div style={{ perspective: "1400px" }}>

          
          
          <div
            ref={bead}
            style={{
              transformStyle: "preserve-3d",
              width: "700px",
              height: "700px",
              position: "relative"
            }}
          >

            {events.map((event, i) => {

              const angle = i * angleStep;

              return (

                <div
  key={i}
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    transform: `translate(-50%, -50%) rotateX(${angle}deg) translateZ(${radius}px)`
  }}
>
  


                  <div className="bg-white shadow-2xl rounded-2xl p-8 w-[55vw] max-w-[700px] mx-auto">

                    <img
                      src={event.img}
                      className="w-full h-[45vh] object-cover rounded-xl"
                    />

                    <h3 className="text-xl font-bold mt-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-500">
                      {event.time}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </div>
  );
}