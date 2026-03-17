import { Link } from "react-router-dom";
import grainImage from "@/assets/grain.jpg";

const Footer = () => {
  const headingClassName = "text-[#c4521a] text-sm md:text-xl font-semibold uppercase tracking-[0.24em] md:tracking-[0.3em] font-[family-name:var(--font-roboto-slab)]";
  const linkClassName = "group relative inline-flex items-center text-[1.02rem] md:text-[1.28rem] text-white/90 hover:text-[#c4521a] transition-all duration-300 hover:translate-x-1 font-[family-name:var(--font-medieval-sharp)] uppercase tracking-tight font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#c4521a] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="w-full z relative">
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#3f3a37] via-[#342f2d] to-[#262220] text-background ">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.4] blur-[0.1px] pointer-events-none z-0">
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

        <div className="container mx-auto px-5 sm:px-7 lg:px-10 relative z-10 pt-8 pb-4 md:pt-16 md:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.2fr] gap-4 md:gap-7 lg:gap-10">
            <div className="pt-6 md:pt-2 lg:-mt-6 flex flex-col items-start text-left lg:items-start lg:text-left">
              <Link className="inline-block mb-4" to="/">
                <span className="text-4xl md:text-5xl font-bold text-[#c4521a] font-[family-name:var(--font-medieval-sharp)] tracking-wider">
                  UTOPIA 2K26
                </span>
              </Link>
              <p className="text-white/85 leading-relaxed max-w-md font-[family-name:var(--font-open-sans)] text-sm md:text-base font-medium">
                UTOPIA 2K26 is the annual cultural fest of MCKV Institute of Engineering, celebrating the fusion of technology, creativity, and the vibrant spirit of Indian culture through competitions, performances, and collaborative experiences.
              </p>
            </div>

            <div className="flex flex-col items-start text-left lg:items-start lg:text-left">
              <h4 className={headingClassName}>Explore</h4>
              <ul className="mt-3 space-y-2 flex flex-col items-start">
                <li>
                  <Link className={linkClassName} to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className={linkClassName} to="/schedule">
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link className={linkClassName} to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start text-left lg:items-start lg:text-left">
              <h4 className={`${headingClassName} mb-2`}>Participate</h4>
              <ul className="mt-3 space-y-2 flex flex-col items-start">
                <li>
                  <Link className={linkClassName} to="/events">
                    Buy Tickets
                  </Link>
                </li>
                <li>
                  <Link className={linkClassName} to="/events">
                    Register Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start text-left lg:items-start lg:text-left">
              <h4 className={headingClassName}>Connect</h4>
              <ul className="mt-3 space-y-2.5 w-full max-w-full">
                <li>
                  <a
                    href="https://www.instagram.com/utopia.mckvie?igsh=MTExNWdhdWY3ZzExMg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-start gap-2.5 text-white/90 hover:text-[#c4521a] transition-all duration-300"
                  >
                    <span className="flex-none flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#c4521a]/20">
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
                        className="w-4 h-4"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] md:text-sm leading-tight font-[family-name:var(--font-open-sans)] tracking-wide font-semibold">
                      instagram.com/utopia.mckvie
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029Vb1611T8fewpIkWGQs0Z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-start gap-2.5 text-white/90 hover:text-[#c4521a] transition-all duration-300"
                  >
                    <span className="flex-none flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#c4521a]/20">
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
                        className="w-4 h-4"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] md:text-sm leading-tight font-[family-name:var(--font-open-sans)] tracking-wide font-semibold">
                      whatsapp.com/channel/utopia
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:utopiaculturalfestmckvie@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-start gap-2.5 text-white/90 hover:text-[#c4521a] transition-all duration-300"
                  >
                    <span className="flex-none flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#c4521a]/20">
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
                        className="w-4 h-4"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] md:text-sm leading-tight font-[family-name:var(--font-open-sans)] tracking-wide font-semibold break-words">
                      utopiaculturalfestmckvie@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-5 md:mt-10 border-t border-white/15 pt-3 md:pt-4 flex items-center justify-center">
            <p className="text-[10px] md:text-[12px] text-white/55 font-[family-name:var(--font-roboto-slab)] uppercase tracking-[0.39em] font-medium text-center">
              © 2026 Utopia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
