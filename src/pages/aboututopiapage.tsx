import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Assets
const gallery1 = "/assets/mckvie.jpg";
const gallery3 = "/assets/utopia23inaug.jpg";
const gallery5 = "/assets/utopia25.jpg";

const paragraphs = [
  "Established in 1999, MCKV Institute of Engineering (MCKVIE) is a top engineering college in West Bengal known for fostering technological learning and application. An autonomous NAAC 'A' Grade accredited institution affiliated with MAKAUT, we offer diverse B.Tech programs including Mechanical, Electrical, Computer Science, and specialized new-age courses in CSE (Data Science) and AI & Machine Learning, alongside M.Tech and MBA programs.",
  "Beyond core academics, MCKVIE is a pioneer of overall development. We foster a vibrant campus culture by balancing rigorous technical education with a wide array of cultural and celebratory events. Our institution believes in nurturing students' creative talents through various co-curricular and extra-curricular platforms, ensuring they excel both in the lab and on the stage.",
  "UTOPIA is the annual cultural fest of MCKVIE—a grand showcase of talent and togetherness. From music, dance, and drama to fashion shows, gaming contests, and celebrity performances, it offers a platform for students to explore their creative limits. UTOPIA 2025 blends culture with innovation, featuring interactive workshops, exhibitions, and food stalls that create an unforgettable, electrifying atmosphere."
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
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#faf8f1] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        ref={targetRef}
        className="relative pt-0 pb-40 flex flex-col items-center text-center w-full"
      >
        
        {/* FULL WIDTH ABOUT IMAGE - Made larger with custom height */}
        <img
  src="/assets/ABOUT.webp"
  alt="About"
  className="block w-full h-[100vh] object-cover drop-shadow-2xl"            
/>

        {/* Subtitle */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="-mt-10 max-w-3xl mx-auto px-6"
        >
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
            A visual journey through moments, culture, and creativity —
            where every frame captures the spirit of innovation and
            tradition coming together.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>
        </motion.div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,237,213,0.5)_0%,transparent_70%)] pointer-events-none -z-10" />
      </section>

      {/* CONTENT SECTIONS */}
      <section className="px-6 md:px-20 py-12 md:py-20 space-y-20 md:space-y-40 pb-20 md:pb-32">

        {/* ROW 1 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <FadeInView direction="left">
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition duration-700 z-10" />
                <img
                  src={gallery1}
                  alt="MCKVIE Campus"
                  className="w-full aspect-video object-cover transform group-hover:scale-105 transition duration-700"
                />
              </div>
            </FadeInView>
          </div>

          <div className="md:col-span-5">
            <FadeInView direction="right">
              <h2 className="text-sm font-bold tracking-widest text-orange-600 uppercase mb-4">
                The Institution
              </h2>
              <h3 className="text-4xl font-serif font-bold mb-6 italic">
                About MCKVIE
              </h3>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {paragraphs[0]}
              </p>
            </FadeInView>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <FadeInView direction="left">
              <h2 className="text-sm font-bold tracking-widest text-rose-600 uppercase mb-4">
                Our Philosophy
              </h2>
              <h3 className="text-4xl font-serif font-bold mb-6 italic">
                Holistic Growth
              </h3>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {paragraphs[1]}
              </p>
            </FadeInView>
          </div>

          <div className="md:col-span-7 order-1 md:order-2">
            <FadeInView direction="right">
              <img
                src={gallery3}
                alt="Culture at MCKVIE"
                className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
              />
            </FadeInView>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <FadeInView direction="left">
              <img
                src={gallery5}
                alt="Utopia 2025"
                className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
              />
            </FadeInView>
          </div>

          <div className="md:col-span-5">
            <FadeInView direction="right">
              <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-4">
                The Main Event
              </h2>
              <h3 className="text-5xl font-black mb-6 tracking-tight">
                UTOPIA 2025
              </h3>
              <p className="text-xl leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                {paragraphs[2]}
              </p>

              <div className="mt-8 p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 italic">
                "Two days where tradition and innovation collide."
              </div>
            </FadeInView>
          </div>
        </div>

      </section>
    </div>
  );
};

export default AboutUtopiaPage;