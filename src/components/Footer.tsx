import { Link } from "react-router-dom";
import grainImage from "@/assets/grain.jpg";

const Footer = () => {
  return (
    <div className="w-full z-[100] relative">
      <footer className="bg-[#423f3d] text-background relative overflow-hidden flex flex-col justify-end min-h-full">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.4] pointer-events-none z-0">
          <img
            alt="Decorative bg"
            loading="lazy"
            decoding="async"
            className="object-cover hidden md:block w-full h-full min-h-full"
            src={grainImage}
          />
          <img
            alt="Decorative bg"
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full min-h-full md:hidden"
            src={grainImage}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 lg:pr-16 relative z-10 py-12 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-12 lg:gap-12">
            <div className="col-span-2 lg:col-span-2 pt-12 md:pt-0">
              <Link className="inline-block mb-6" to="/">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <span className="text-5xl md:text-7xl font-bold text-primary font-[family-name:var(--font-medieval-sharp)] tracking-wider">
                      UTOPIA 2K26
                    </span>
                  </div>
                </div>
              </Link>
              <p className="text-white leading-relaxed max-w-sm font-[family-name:var(--font-open-sans)] text-sm md:text-base">
                UTOPIA 2K26 is the annual cultural fest of MCKV Institute of Engineering, celebrating the fusion of technology, creativity, and the vibrant spirit of Indian culture through competitions, performances, and collaborative experiences.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] text-white/80 font-[family-name:var(--font-roboto-slab)] uppercase tracking-[0.2em]">
                  © 2026 Utopia. All rights reserved.
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-primary font-bold mb-6 text-base md:text-lg uppercase tracking-[0.3em] font-[family-name:var(--font-roboto-slab)]">
                Explore
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/#featured-artists"
                  >
                    Artists
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/#sponsors"
                  >
                    Sponsors
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-primary font-bold mb-6 text-base md:text-lg uppercase tracking-[0.3em] font-[family-name:var(--font-roboto-slab)]">
                Participate
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/events"
                  >
                    Buy Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-lg md:text-2xl text-white hover:text-primary transition-colors inline-block font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight"
                    to="/events"
                  >
                    Register Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h4 className="text-primary font-bold mb-6 text-base md:text-lg uppercase tracking-[0.3em] font-[family-name:var(--font-roboto-slab)]">
                Connect
              </h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a
                    href="https://www.instagram.com/utopia.mckvie?igsh=MTExNWdhdWY3ZzExMg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white hover:text-primary transition-colors group"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem', textAlign: 'left' }}
                  >
                    <span className="footer-connect-icon" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </span>
                    <span className="text-xs md:text-sm font-[family-name:var(--font-open-sans)] tracking-wide">
                      instagram.com/utopia.mckvie
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029Vb1611T8fewpIkWGQs0Z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white hover:text-primary transition-colors group"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem', textAlign: 'left' }}
                  >
                    <span className="footer-connect-icon" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </span>
                    <span className="text-xs md:text-sm font-[family-name:var(--font-open-sans)] tracking-wide">
                      whatsapp.com/channel/utopia
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:utopiaculturalfestmckvie@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white hover:text-primary transition-colors group"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem', textAlign: 'left' }}
                  >
                    <span className="footer-connect-icon" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <span className="text-xs md:text-sm font-[family-name:var(--font-open-sans)] tracking-wide">
                      utopiaculturalfestmckvie@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
