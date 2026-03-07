import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const StaggerText = ({ text, className = "", delay = 0, tag = "h1" }: StaggerTextProps) => {
  const words = text.split(" ");
  const Tag = tag;

  return (
    <Tag className={`${className} overflow-hidden`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "150%", rotate: 8 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{
              duration: 1.4,
              delay: delay + i * 0.06,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default StaggerText;
