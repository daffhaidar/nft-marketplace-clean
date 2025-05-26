import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom text-center">
      <div className="container py-4">
        <div className="row">
          <div className="col-12 mb-3">
            {/* Optional: Link the brand to home, or just display text */}
            <Link className="footer-brand" to="/">
              DANNA'S SITE
            </Link>
          </div>
          <div className="col-12 mb-3 footer-social-links">
            {/* Using existing Font Awesome icons. fa-discord might require FA 5+ */}
            <a href="https://github.com/daffhaidar" target="_blank" rel="noopener noreferrer" className="social-icon me-3" title="GitHub">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/daffhaidar" target="_blank" rel="noopener noreferrer" className="social-icon me-3" title="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://daffhaidar.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Portfolio">
              <i className="fa fa-globe"></i>
            </a>
          </div>
          <div className="col-12">
            <p className="footer-copyright mb-0">&copy; {currentYear} Danna's Site. By Daffa Haidar.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
