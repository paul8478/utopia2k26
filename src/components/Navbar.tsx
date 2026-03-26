// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import MagneticButton from "./MagneticButton";
// import { Menu, X, Volume2, VolumeX } from "lucide-react";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/aboututopia", label: "About" },
//   { to: "/event", label: "Event" },
//   { to: "/schedule", label: "Schedule" },
//   { to: "/gallery", label: "Gallery" },
//   { to: "/teams", label: "Team" },
//   { to: "/contact", label: "Contact" },
  
// ];

// const Navbar = () => {
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const isNeon = location.pathname === "/day-2";
//   const isHome = location.pathname === "/";
//   // Pages with very dark or black full-screen backgrounds
//   const isDark = ["/day-1", "/day-2"].includes(location.pathname);

//   // Compute navbar background class
//   const navBg = isDark
//     ? "bg-black/50 border-white/10"
//     : isHome
//     ? "bg-white/80 border-gray-200/30"
//     : "bg-background/60 border-border/30";

//   // Compute link text color for non-active links
//   const inactiveLinkColor = isDark
//     ? "text-white/70 hover:text-white"
//     : isHome
//     ? "text-gray-600 hover:text-gray-900"
//     : "text-muted-foreground hover:text-foreground";

//   // Active link color
//   const activeLinkColor = isNeon ? "text-neon-green" : isDark ? "text-white" : "text-primary";
//   const mobileLinkColor = isDark
//     ? "text-white/90 hover:text-white"
//     : isHome
//     ? "text-gray-800 hover:text-primary"
//     : "text-foreground hover:text-primary";

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileOpen]);

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-[9999] px-4 md:px-12 py-0 flex items-center justify-between backdrop-blur-md border-b ${navBg}`}>
//         <Link to="/" className="flex items-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-95 duration-200">
//           <img 
//             src="/Navbar_Logo.png" 
//             alt="Utopia Logo" 
//             className="hidden md:block h-16 w-auto object-contain drop-shadow-sm scale-[2.2] origin-left" 
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-1">
//           {links.map((link) => (
//             <MagneticButton key={link.to} strength={0.2}>
//               <Link
//                 to={link.to}
//                 className={`px-4 py-2 text-l font-bold uppercase tracking-widest transition-colors duration-300 ${
//                   location.pathname === link.to ? activeLinkColor : inactiveLinkColor
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             </MagneticButton>
//           ))}
          
//           <MagneticButton strength={0.2}>
//             <button
//               onClick={() => setIsMuted(!isMuted)}
//               className={`p-2 rounded-full transition-all duration-300 ml-2 group ${
//                 isDark ? "bg-white/10 hover:bg-white/20 text-white" : 
//                 isHome ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : 
//                 "bg-primary/10 hover:bg-primary/20 text-primary"
//               }`}
//               aria-label={isMuted ? "Unmute music" : "Mute music"}
//             >
//               {isMuted ? (
//                 <VolumeX size={18} className="group-hover:scale-110 transition-transform" />
//               ) : (
//                 <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
//               )}
//             </button>
//           </MagneticButton>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           className={`md:hidden h-10 w-10 rounded-md flex items-center justify-center border transition-colors ${isDark ? "text-white border-white/20 bg-black/20" : isHome ? "text-gray-800 border-gray-300/60 bg-white/60" : "text-foreground border-border/50 bg-background/60"}`}
//           onClick={() => setMobileOpen(!mobileOpen)}
//           aria-label="Toggle mobile menu"
//           aria-expanded={mobileOpen}
//         >
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className={`fixed md:hidden inset-x-0 top-[64px] bottom-0 z-[9998] backdrop-blur-xl px-6 pt-6 pb-10 overflow-y-auto flex flex-col items-center gap-5 ${isDark ? "bg-black/92" : isHome ? "bg-white/92" : "bg-background/95"}`}
//           >
//             {links.map((link, i) => (
//               <motion.div
//                 key={link.to}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <Link
//                   to={link.to}
//                   onClick={() => setMobileOpen(false)}
//                   className={`font-serif text-2xl tracking-wide transition-colors ${location.pathname === link.to ? activeLinkColor : mobileLinkColor}`}
//                 >
//                   {link.label}
//                 </Link>
//               </motion.div>
//             ))}

//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: links.length * 0.1 }}
//               onClick={() => setIsMuted(!isMuted)}
//               className={`mt-6 p-4 rounded-full flex items-center gap-3 font-serif text-xl border ${
//                 isDark ? "border-white/20 text-white bg-white/10" : 
//                 isHome ? "border-gray-200 text-gray-800 bg-gray-50" : 
//                 "border-primary/20 text-primary bg-primary/5"
//               }`}
//             >
//               {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//               {isMuted ? "Unmute Music" : "Mute Music"}
//             </motion.button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;





import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/aboututopia", label: "About" },
  { to: "/event", label: "Event" },
  { to: "/schedule", label: "Schedule" },
  { to: "/gallery", label: "Gallery" },
  { to: "/teams", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // start muted for autoplay safety
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isNeon = location.pathname === "/day-2";
  const isHome = location.pathname === "/";
  const isDark = ["/day-1", "/day-2"].includes(location.pathname);

  const navBg = isDark
    ? "bg-black/50 border-white/10"
    : isHome
    ? "bg-white/80 border-gray-200/30"
    : "bg-background/60 border-border/30";

  const inactiveLinkColor = isDark
    ? "text-white/70 hover:text-white"
    : isHome
    ? "text-gray-600 hover:text-gray-900"
    : "text-muted-foreground hover:text-foreground";

  const activeLinkColor = isNeon
    ? "text-neon-green"
    : isDark
    ? "text-white"
    : "text-primary";

  const mobileLinkColor = isDark
    ? "text-white/90 hover:text-white"
    : isHome
    ? "text-gray-800 hover:text-primary"
    : "text-foreground hover:text-primary";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // 🎵 Control Audio Play / Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  // Optional: set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] px-4 md:px-12 py-0 flex items-center justify-between backdrop-blur-md border-b ${navBg}`}>
        <Link to="/" className="flex items-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-95 duration-200">
          <img 
            src="/Navbar_Logo.png" 
            alt="Utopia Logo" 
            className="hidden md:block h-16 w-auto object-contain drop-shadow-sm scale-[2.2] origin-left" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <MagneticButton key={link.to} strength={0.2}>
              <Link
                to={link.to}
                className={`px-4 py-2 text-l font-bold uppercase tracking-widest transition-colors duration-300 ${
                  location.pathname === link.to
                    ? activeLinkColor
                    : inactiveLinkColor
                }`}
              >
                {link.label}
              </Link>
            </MagneticButton>
          ))}

          {/* 🔊 SOUND BUTTON */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-full transition-all duration-300 ml-2 group ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : isHome
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-primary/10 hover:bg-primary/20 text-primary"
              }`}
              aria-label={isMuted ? "Unmute music" : "Mute music"}
            >
              {isMuted ? (
                <VolumeX
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              ) : (
                <Volume2
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden h-10 w-10 rounded-md flex items-center justify-center border transition-colors ${
            isDark
              ? "text-white border-white/20 bg-black/20"
              : isHome
              ? "text-gray-800 border-gray-300/60 bg-white/60"
              : "text-foreground border-border/50 bg-background/60"
          }`}
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
            className={`fixed md:hidden inset-x-0 top-[64px] bottom-0 z-[9998] backdrop-blur-xl px-6 pt-6 pb-10 overflow-y-auto flex flex-col items-center gap-5 ${
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
                  className={`font-serif text-2xl tracking-wide transition-colors ${
                    location.pathname === link.to
                      ? activeLinkColor
                      : mobileLinkColor
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* 🔊 MOBILE SOUND BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.1 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`mt-6 p-4 rounded-full flex items-center gap-3 font-serif text-xl border ${
                isDark
                  ? "border-white/20 text-white bg-white/10"
                  : isHome
                  ? "border-gray-200 text-gray-800 bg-gray-50"
                  : "border-primary/20 text-primary bg-primary/5"
              }`}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              {isMuted ? "Unmute Music" : "Mute Music"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;