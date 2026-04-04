import { Link } from "react-router-dom";
import "../../src/components/css/footer.css";

const grainImage = "/assets/grain.jpg";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer-shell">

        {/* Grain overlay */}
        <div className="footer-grain">
          <img
            alt="Decorative bg"
            loading="lazy"
            decoding="async"
            src={grainImage}
          />
        </div>

        <div className="footer-container">
          <div className="footer-grid">

            {/* ── Brand block ── */}
            <div className="footer-brand">
              <Link className="footer-brand-link" to="/">
                <span className="footer-brand-title">UTOPIA 2K26</span>
              </Link>
              <p className="footer-brand-desc">
                UTOPIA 2K26 is the annual cultural fest of MCKV Institute of
                Engineering, celebrating the fusion of technology, creativity,
                and the vibrant spirit of Indian culture through competitions,
                performances, and collaborative experiences.
              </p>
            </div>

            {/* ── Explore + Discover (side-by-side on mobile) ── */}
            <div className="footer-mid-pair">

              {/* Explore */}
              <div className="footer-explore">
                <h4 className="footer-heading">Explore</h4>
                <ul className="footer-nav-list">
                  <li><Link className="footer-nav-link" to="/about">About Us</Link></li>
                  <li><Link className="footer-nav-link" to="/coming-soon">Schedule</Link></li>
                  <li><Link className="footer-nav-link" to="/contact">Contact Us</Link></li>
                </ul>
              </div>

              {/* Discover */}
              <div className="footer-discover">
                <h4 className="footer-heading">Discover</h4>
                <ul className="footer-nav-list">
                  <li><Link className="footer-nav-link" to="/coming-soon">Events</Link></li>
                  <li><Link className="footer-nav-link" to="/coming-soon">Our Team</Link></li>
                  <li><Link className="footer-nav-link" to="/gallery">Gallery</Link></li>
                </ul>
              </div>

            </div>

            {/* ── Connect ── */}
            <div className="footer-connect">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-connect-list">

                {/* Instagram */}
                <li>
                  <a
                    href="https://www.instagram.com/utopia.mckvie?igsh=MTExNWdhdWY3ZzExMg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span className="footer-connect-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </span>
                    <span className="footer-social-label">
                      instagram.com/utopia.mckvie
                    </span>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029Vb1611T8fewpIkWGQs0Z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span className="footer-connect-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </span>
                    <span className="footer-social-label">
                      whatsapp.com/channel/utopia
                    </span>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href="mailto:utopiaculturalfestmckvie@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span className="footer-connect-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <span className="footer-social-label">
                      utopiaculturalfestmckvie@gmail.com
                    </span>
                  </a>
                </li>

              </ul>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 Utopia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;