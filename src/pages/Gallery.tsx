import { motion } from "framer-motion";
import TiltImage from "@/components/TiltImage";

const images = Array.from({ length: 30 }, (_, i) => ({
  src: `/gallery/${i + 1}.jpeg`,
  alt: `Image ${i + 1}`,
}));

const Gallery = () => {
  const renderRow = (direction: "left" | "right", rowImages: typeof images) => {
    const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
    return (
      <div className="overflow-hidden w-full">
        <motion.div
          animate={{ x: animateX }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-4 lg:gap-6"
        >
          {[...rowImages, ...rowImages].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-24 sm:w-52 sm:h-32 md:w-64 md:h-40 lg:w-72 lg:h-44">
              <TiltImage src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative bg-background min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }} 
        className="pt-24"
      >
        <section className="px-4 sm:px-10 lg:px-20 py-20 text-center">
          <motion.img
            src="/deb/Culturex-CLmvyJNH.png"
            alt="Gallery"
            className="w-full max-w-6xl mx-auto object-contain drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <p className="mt-10 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A visual journey through moments, culture, and creativity — where every
            frame captures the spirit of innovation and tradition coming together.
          </p>
        </section>

        <section className="flex flex-col gap-10 sm:gap-12 lg:gap-16 px-4 sm:px-10 lg:px-20 py-16">
          {renderRow("left", images.slice(0, 10))}
          {renderRow("right", images.slice(10, 20))}
          {renderRow("left", images.slice(20, 30))}
        </section>

        <section className="py-20 text-center px-4 sm:px-10 lg:px-20">
          <p className="text-2xl sm:text-3xl font-serif italic text-muted-foreground">
            “Moments fade, but the stories they create live forever.”
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Gallery;