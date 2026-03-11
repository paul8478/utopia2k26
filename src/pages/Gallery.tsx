import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltImage from "@/components/TiltImage";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [
  { src: gallery1, alt: "Image 1" },
  { src: gallery2, alt: "Image 2" },
  { src: gallery3, alt: "Image 3" },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const row1 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const row2 = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"]);
  const row3 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const renderRow = (xMotion: any) => (
    <motion.div style={{ x: xMotion }} className="flex gap-8">
      {[...images, ...images, ...images].map((img, i) => (
        <div key={i} className="flex-shrink-0 w-[420px] h-[280px]">
          <TiltImage
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="bg-background pt-24 overflow-hidden">

      {/* Title */}
      <section className="px-20 py-20 text-center">
        <h1 className="text-[9vw] font-serif font-black">Gallery</h1>

        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
          A visual journey through moments, culture, and creativity — where every
          frame captures the spirit of innovation and tradition coming together.
        </p>
      </section>

      {/* Scroll Gallery */}
      <section ref={containerRef} className="relative h-[250vh]">

        <div className="sticky top-0 h-screen flex flex-col justify-center gap-20 overflow-hidden px-20">

          {/* Row 1 */}
          {renderRow(row1)}

          {/* Row 2 */}
          {renderRow(row2)}

          {/* Row 3 */}
          {renderRow(row3)}

        </div>

      </section>

      {/* Bottom Quote */}
      <section className="py-24 text-center px-20">
        <p className="text-3xl font-serif italic text-muted-foreground">
          “Moments fade, but the stories they create live forever.”
        </p>
      </section>

    </div>
  );
};

export default Gallery;