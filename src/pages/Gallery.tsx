import { motion } from "framer-motion";
import TiltImage from "@/components/TiltImage";

// Always serve WebP thumbnails – each is only ~15–40 KB vs the 10 MB originals
const getImageSrc = (index: number) => `/gallery/webp/${index}.webp`;

// Each row loops through 10 unique images (duplicated once for seamless loop)
const rowImages = (start: number) =>
  Array.from({ length: 10 }, (_, i) => start + i + 1);

const Gallery = () => {
  const renderRow = (direction: "left" | "right", start: number) => {
    const images = rowImages(start);
    // Duplicate the array once → seamless loop: [1..10, 1..10]
    const items = [...images, ...images];
    const animName =
      direction === "left" ? "marquee-left" : "marquee-right";

    return (
      <div
        className="overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-6"
          style={{
            animation: `${animName} 35s linear infinite`,
            willChange: "transform",
            width: "max-content",
          }}
        >
          {items.map((imgIndex, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-44 h-28 sm:w-56 sm:h-36 md:w-64 md:h-40 lg:w-72 lg:h-44 p-[3px] bg-black rounded-xl overflow-hidden"
            >
              <TiltImage
                src={getImageSrc(imgIndex)}
                alt={`Gallery image ${imgIndex}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-background min-h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* CSS keyframe definitions – zero JS cost at runtime */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full flex flex-col justify-center items-center py-12"
      >
        <section className="px-4 sm:px-10 lg:px-20 pb-12 pt-8 flex flex-col items-center text-center">
          <motion.img
            src="/assets/Gallery.webp"
            alt="Gallery"
            className="w-full max-w-6xl mx-auto object-contain drop-shadow-2xl mt-8 mb-10"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <p className="max-w-4xl text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed mx-auto">
            A visual journey through moments, culture, and creativity — where every frame captures the spirit of innovation and tradition coming together.
          </p>
        </section>

        <section className="flex flex-col gap-12 w-full px-4 sm:px-10 lg:px-20 py-8">
          {renderRow("left", 0)}   {/* Images 1–10 */}
          {renderRow("right", 10)} {/* Images 11–20 */}
          {renderRow("left", 20)}  {/* Images 21–30 */}
        </section>

        {/* Updated Quote Section */}
        <section className="pt-12 pb-8 text-center w-full px-2 sm:px-10 lg:px-20 overflow-hidden">
          <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-serif italic tracking-widest text-muted-foreground/80 whitespace-nowrap mx-auto">
            "Moments fade, but the stories they create live forever."
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Gallery;