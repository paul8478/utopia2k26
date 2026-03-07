import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const paragraphs = [
  "Utopia 2K26 is not just a festival — it is a manifesto. A declaration that rhythm has no borders, no timelines, no constraints.",
  "Born from the sacred temples of South India to the pulsating underground clubs of Berlin, rhythm is the universal language that connects us all.",
  "We believe that a Bharatanatyam mudra and a DJ's drop share the same DNA — the human need to express, to move, to transcend.",
  "This festival is our offering to that belief. Two days where tradition and innovation don't just coexist — they collide, they merge, they create something entirely new.",
];

const breathe = {
  scale: [1, 1.03, 1],
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
};

const LineRevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className="text-lg md:text-2xl leading-relaxed font-sans text-foreground/90"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {text}
    </motion.p>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 relative">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Golden hour ambient glow */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_left,_hsl(30_100%_60%/0.3)_0%,_transparent_70%)]" />

      {/* Header */}
      <section className="px-6 md:px-20 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">The Manifesto</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-[12vw] md:text-[8vw] font-serif font-black mt-4 leading-[0.85] tracking-[-0.04em]">
              Where Ancient<br />
              <span className="italic text-gold">Meets</span> Electric
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Asymmetrical Editorial Layout */}
      <section className="px-6 md:px-20 py-20 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          {/* Left - Text */}
          <div className="md:col-span-5 space-y-10">
            {paragraphs.map((p, i) => (
              <LineRevealText key={i} text={p} delay={i * 0.08} />
            ))}
          </div>

          {/* Right - Floating Images with Parallax */}
          <div className="md:col-span-7 relative min-h-[600px]">
            <ScrollReveal delay={0.2} className="relative z-10">
              <motion.div className="relative w-3/4 ml-auto overflow-hidden">
                <motion.img
                  src={gallery1}
                  alt="Kathak dancer"
                  className="w-full shadow-2xl"
                  whileInView={{ y: [60, 0] }}
                  animate={breathe}
                  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(30_100%_60%/0.15)_0%,_transparent_70%)]" />
              </motion.div>
            </ScrollReveal>
            <ScrollReveal delay={0.35} className="mt-[-100px] relative z-20">
              <motion.div className="relative w-1/2 overflow-hidden">
                <motion.img
                  src={gallery3}
                  alt="Dhol drummer"
                  className="w-full shadow-2xl border-4 border-background"
                  whileInView={{ y: [80, 0] }}
                  animate={breathe}
                  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(30_100%_60%/0.1)_0%,_transparent_70%)]" />
              </motion.div>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="mt-[-50px] ml-auto relative z-10">
              <motion.div className="relative w-2/3 ml-auto overflow-hidden">
                <motion.img
                  src={gallery5}
                  alt="Sitar player"
                  className="w-full shadow-2xl"
                  whileInView={{ y: [60, 0] }}
                  animate={breathe}
                  transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(30_100%_60%/0.1)_0%,_transparent_70%)]" />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-border relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "50+", label: "Artists" },
            { num: "2", label: "Days" },
            { num: "10K", label: "Attendees" },
            { num: "1", label: "Heartbeat" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center">
                <span className="text-[10vw] md:text-[5vw] font-serif font-black text-primary leading-none">{stat.num}</span>
                <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.4em] text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
