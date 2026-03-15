import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/event", label: "Event" },
  { to: "/schedule", label: "Schedule" },
  { to: "/gallery", label: "Gallery" },
  { to: "/teams", label: "Team" },
  { to: "/contact", label: "Contact" },
  { to: "/aboututopia", label: "About" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNeon = location.pathname === "/day-2";
  const isHome = location.pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between backdrop-blur-md border-b ${isHome
          ? "bg-white/80 border-gray-200/30"
          : "bg-background/60 border-border/30"
        }`}>
        <Link to="/" className="font-serif text-xl md:text-2xl font-bold tracking-wider">
          <span className={isNeon ? "neon-glow-green" : ""} style={{ color: isNeon ? "hsl(var(--neon-green))" : "hsl(var(--primary))" }}>
            UTOPIA
          </span>
          <span className="text-muted-foreground ml-1 font-sans text-sm font-light">2K26</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <MagneticButton key={link.to} strength={0.2}>
              <Link
                to={link.to}
                className={`px-4 py-2 text-sm font-sans uppercase tracking-widest transition-colors duration-300 ${location.pathname === link.to
                    ? isNeon ? "text-neon-green" : "text-primary"
                    : isHome
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${isHome ? "text-gray-800" : "text-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 flex flex-col items-center gap-6"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
