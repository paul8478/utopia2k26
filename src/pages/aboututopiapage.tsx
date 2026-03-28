import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const gallery1 = "/assets/mckvie.jpg";
const gallery3 = "/assets/utopia23inaug.jpg";
const gallery5 = "/assets/utopia25.jpg";

const paragraphs = [
  "Established in 1999, MCKV Institute of Engineering (MCKVIE) is a top engineering college in West Bengal known for fostering technological learning and application. An autonomous NAAC 'A' Grade accredited institution affiliated with MAKAUT, we offer diverse B.Tech programs including Mechanical, Electrical, Computer Science, and specialized new-age courses in CSE (Data Science) and AI & Machine Learning, alongside M.Tech and MBA programs.",

  "Beyond core academics, MCKVIE supports holistic student growth through cultural, technical and creative platforms. Students get opportunities in events, clubs, competitions and innovation activities helping them develop leadership, teamwork and creativity skills.",

  "UTOPIA is the annual cultural fest of MCKVIE — a celebration of talent, creativity and innovation. From music, dance, drama and fashion shows to gaming competitions and celebrity performances, UTOPIA creates an energetic and memorable experience for everyone."
];

const FadeInView = ({
  children,
  direction = "up",
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x:
        direction === "left"
          ? -40
          : direction === "right"
          ? 40
          : 0,
    }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

const AboutUtopiaPage = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);

  return (
    <div className="min-h-screen bg-[#FAF8F0] dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden">

      {/* HERO */}
      <section
        ref={targetRef}
        className="relative flex flex-col items-center text-center w-full"
      >
        <motion.img
          src="/assets/ABOUT.webp"
          alt="About"
          style={{ opacity, scale }}
          className="w-full h-[100vh] object-cover"
        />

        {/* LOGOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-16 md:-mt-24 flex justify-center gap-8 md:gap-16 px-6 relative z-10"
        >
          {[
            {
              src: "/assets/MCKVIE.png",
              label: "MCKVIE",
              color: "border-orange-400",
            },
            {
              src: "/assets/NAAC.png",
              label: "NAAC A Grade",
              color: "border-blue-400",
            },
            {
              src: "/assets/AICTE.png",
              label: "AICTE Approved",
              color: "border-green-400",
            },
          ].map((logo, index) => (

            <div key={index} className="flex flex-col items-center gap-3">

              <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-2 ${logo.color}
                bg-white/95 dark:bg-slate-900/95
                flex items-center justify-center
                shadow-xl
                overflow-hidden`}
              >
                <img
                  src={logo.src}
                  alt={logo.label}
                  className="w-[80%] h-[80%] object-contain"
                />
              </div>

              <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-slate-600 dark:text-slate-400">
                {logo.label}
              </span>

            </div>

          ))}
        </motion.div>

      </section>



      {/* CONTENT */}
      <section className="px-6 md:px-20 py-24 md:py-40 space-y-32 md:space-y-40">

        {/* ABOUT */}
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">

          <FadeInView direction="left">
            <img
              src={gallery1}
              className="rounded-xl shadow-lg border w-full"
            />
          </FadeInView>

          <FadeInView direction="right">

            <div>

              <h2 className="text-sm text-[#BD9354] uppercase">
                The Institution
              </h2>

              <h3 className="text-4xl font-bold pb-3">
                About MCKVIE
              </h3>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                {paragraphs[0]}
              </p>

            </div>

          </FadeInView>

        </div>



        {/* PHILOSOPHY */}
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">

          <FadeInView direction="left">

            <div>

              <h2 className="text-sm text-[#BD9354] uppercase">
                Our Philosophy
              </h2>

              <h3 className="text-4xl font-bold pb-3">
                Holistic Growth
              </h3>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                {paragraphs[1]}
              </p>

            </div>

          </FadeInView>


          <FadeInView direction="right">

            <img
              src={gallery3}
              className="rounded-xl shadow-lg border w-full"
            />

          </FadeInView>

        </div>



        {/* UTOPIA */}
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-start">

          <FadeInView direction="left">

            <img
              src={gallery5}
              className="rounded-xl shadow-xl border w-full"
            />

          </FadeInView>


          <FadeInView direction="right">

            <div>

              <h2 className="text-sm text-[#BD9354] uppercase">
                The Main Event
              </h2>

              <h3 className="text-4xl font-bold pb-3">
                UTOPIA 2K26
              </h3>

              <p className="text-lg text-slate-600 dark:text-slate-400 pb-5">
                {paragraphs[2]}
              </p>

              <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 px-5 py-4 italic">
                Two days where tradition and innovation collide.
              </div>

            </div>

          </FadeInView>

        </div>

      </section>

    </div>
  );
};

export default AboutUtopiaPage;