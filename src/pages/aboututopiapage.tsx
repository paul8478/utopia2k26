import { motion } from "framer-motion";

import gallery1 from "@/assets/mckvie.jpg";
import gallery3 from "@/assets/utopia23inaug.jpg";
import gallery5 from "@/assets/utopia25.jpg";

const paragraphs = [
  "MCKV Institute of Engineering (MCKVIE) is a prominent, NAAC 'A' Grade accredited, and Autonomous Institute located in Howrah, West Bengal, specializing in engineering and technology education. Established in 1999, it is affiliated with MAKAUT and approved by AICTE.",

  "MCKVIE fosters a vibrant campus culture by balancing rigorous technical education with a wide array of cultural, artistic, and celebratory events. The institute believes students must nurture both academic and creative talents.",

  "Utopia – The Annual Cultural Fest is the flagship cultural event where students showcase talents in music, dance, and drama. Two days where tradition and innovation collide and create something extraordinary.",
];

const breathe = {
  scale: [1, 1.03, 1],
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
};

const AboutUtopiaPage = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* TITLE SECTION */}
      <section className="pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-[10vw] md:text-[6vw] font-serif font-black leading-[0.9] tracking-[-0.03em]">
            About <span className="text-orange-500">Utopia</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the spirit, culture, and creativity behind MCKVIE's annual cultural festival.
          </p>

        </div>
      </section>


      {/* CONTENT SECTION */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto space-y-32">

          {/* ROW 1 */}
          <div className="grid md:grid-cols-12 gap-12 items-center">

            <div className="md:col-span-6">
              <motion.img
                src={gallery1}
                alt="MCKVIE"
                className="w-full shadow-2xl rounded-lg"
                animate={breathe}
              />
            </div>

            <div className="md:col-span-6 text-lg leading-relaxed">
              {paragraphs[0]}
            </div>

          </div>


          {/* ROW 2 */}
          <div className="grid md:grid-cols-12 gap-12 items-center">

            <div className="md:col-span-6 order-2 md:order-1 text-lg leading-relaxed">
              {paragraphs[1]}
            </div>

            <div className="md:col-span-6 order-1 md:order-2">
              <motion.img
                src={gallery3}
                alt="Utopia Event"
                className="w-full shadow-2xl rounded-lg"
                animate={breathe}
              />
            </div>

          </div>


          {/* ROW 3 */}
          <div className="grid md:grid-cols-12 gap-12 items-center">

            <div className="md:col-span-6">
              <motion.img
                src={gallery5}
                alt="Utopia Fest"
                className="w-full shadow-2xl rounded-lg"
                animate={breathe}
              />
            </div>

            <div className="md:col-span-6 text-lg leading-relaxed">
              {paragraphs[2]}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUtopiaPage;