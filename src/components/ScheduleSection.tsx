"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ganesh from "../assets/ganesh.jpg";
import lunch from "../assets/lunch.jpg";
import cultural2 from "../assets/cultural2.jpg";
import cultural3 from "../assets/cultural3.jpg";
import main_event from "../assets/main_event.jpg";


gsap.registerPlugin(ScrollTrigger);

const events = [
  { time: "09:00 AM", title: "Opening Ceremony", img: ganesh },
  { time: "10:30 AM", title: "Cultural Performance", img: cultural2 },
  { time: "01:00 PM", title: "Lunch Break", img: lunch},
  { time: "02:30 PM", title: "Cultural Programme", img: cultural3 },
  { time: "05:00 PM", title: "Main Event", img: main_event}
];

export default function ScheduleSection() {

  const container = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {

    gsap.to(progress.current, {
      height: "100%",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

  }, []);

  return (

    <div ref={container} className="relative min-h-[300vh]">

      {/* progress line */}
      <div className="fixed left-10 top-0 h-full w-[3px] bg-gray-200">
        <div ref={progress} className="bg-black w-full h-0"/>
      </div>

      {/* events */}
      <div className="max-w-5xl mx-auto py-40 space-y-48">

        {events.map((event,i)=>(
          <div key={i} className="flex items-center gap-10">

            <img
              src={event.img}
              className="w-72 h-48 object-cover rounded-xl shadow-lg"
            />

            <div>
              <h3 className="text-2xl font-bold">{event.title}</h3>
              <p className="text-gray-500">{event.time}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
