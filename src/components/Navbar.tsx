import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/aboututopia", label: "About" },
  { to: "/coming-soon", label: "Event" },
  { to: "/coming-soon", label: "Schedule" },
  { to: "/gallery", label: "Gallery" },
  { to: "/coming-soon", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isNeon = location.pathname === "/day-2";
  const isHome = location.pathname === "/";
  const isDark = ["/day-1", "/day-2"].includes(location.pathname);

  const navBg = "bg-white border-gray-200/30";

  const inactiveLinkColor = "text-black/80 hover:text-black";

  const activeLinkColor = "text-black";

  const mobileLinkColor = "text-black/80 hover:text-black";

  useEffect(() => {
    const savedMute = localStorage.getItem("isMuted");
    if (savedMute !== null) {
      setIsMuted(savedMute === "true");
    }
  }, []);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem("isMuted", String(newState));
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    if (isMuted) {
      audio.pause();
    } else {
      const playAudio = () => {
        audio.play().catch(() => {});
      };

      playAudio();
      document.addEventListener("click", playAudio, { once: true });
      document.addEventListener("touchstart", playAudio, { once: true });
    }
  }, [isMuted]);

  return (
    <>
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/assets/song.mpeg" type="audio/mpeg" />
      </audio>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6 md:px-12 flex items-center justify-between backdrop-blur-md border-b ${navBg}`}
      >
        {/* ✅ FIXED LOGO */}
        <div
  className="flex items-center gap-1 sm:gap-2 md:gap-5 transition-transform hover:scale-[1.02] active:scale-95 duration-200"
>
  <img
    src="/nb.png"
    alt="Utopia Logo"
    className="h-8 sm:h-10 md:h-12 lg:h-14 p-1.5 sm:p-2 w-auto object-contain drop-shadow-sm transition-all duration-300"
  />
</div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <MagneticButton key={link.to} strength={0.2}>
              <Link
                to={link.to}
                className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-bold uppercase tracking-widest ${
                  location.pathname === link.to
                    ? activeLinkColor
                    : inactiveLinkColor
                }`}
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}

          <MagneticButton strength={0.2}>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full ml-2 bg-gray-100 text-black"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </MagneticButton>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center border border-gray-300/60 bg-white/60 text-black rounded-md"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed md:hidden inset-x-0 top-[64px] bottom-0 z-[9998] backdrop-blur-xl px-6 pt-6 pb-10 overflow-y-auto flex flex-col items-center gap-6 ${
              isDark
                ? "bg-black/92"
                : isHome
                ? "bg-white/92"
                : "bg-background/95"
            }`}
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
                  className={`font-serif text-xl sm:text-2xl ${
                    location.pathname === link.to
                      ? activeLinkColor
                      : mobileLinkColor
                  }`}
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