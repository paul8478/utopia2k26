import { motion } from "framer-motion";
import TiltImage from "@/components/TiltImage";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [
  { src: gallery1, alt: "Image 1" },
  { src: gallery2, alt: "Image 2" },
  { src: gallery3, alt: "Image 3" },
];

const getSevenImages = () => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(images[i % images.length]);
  }
  return arr;
};

const Gallery = () => {

  const renderRow = (direction: "left" | "right") => {
    const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

    return (
      <div className="overflow-hidden w-full">
        <motion.div
          animate={{ x: animateX }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-4 lg:gap-6"
        >
          {[...getSevenImages(), ...getSevenImages()].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-24 sm:w-52 sm:h-32 md:w-64 md:h-40 lg:w-72 lg:h-44"
            >
              <TiltImage
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="bg-background pt-24 overflow-hidden">

      {/* Title Section */}
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

      {/* Gallery Rows */}
      <section className="flex flex-col gap-10 sm:gap-12 lg:gap-16 px-4 sm:px-10 lg:px-20 py-16">

        {/* Row 1 */}
        {renderRow("left")}

        {/* Row 2 */}
        {renderRow("right")}

        {/* Row 3 */}
        {renderRow("left")}

      </section>

      {/* Quote Section */}
      <section className="py-20 text-center px-4 sm:px-10 lg:px-20">

        <p className="text-2xl sm:text-3xl font-serif italic text-muted-foreground">
          “Moments fade, but the stories they create live forever.”
        </p>

      </section>

    </div>
  );
};

export default Gallery;