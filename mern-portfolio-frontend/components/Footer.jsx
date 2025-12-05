import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // FontAwesome icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // List of primary footer links (internal routes)
  const footerLinks = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Projects", url: "/projects" },
    { label: "Contact", url: "/contact" },
  ];

  // Public URLs (external links)
  const publicUrls = [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com" },
    { label: "Facebook", url: "https://www.facebook.com" },
    { label: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <footer
      style={{
        backgroundColor: "var(--rich-black)",
        color: "var(--text-light)",
        textAlign: "center",
        padding: "1.2rem 0",
        marginTop: "3rem",
        borderTop: "1px solid var(--primary-gold)",
      }}
    >
      <div className="footer-content">
        {/* Primary Footer Links (Internal) */}
        <div className="footer-links">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              style={{
                color: "var(--text-light)",
                textDecoration: "none",
                margin: "0 15px",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--primary-gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-light)")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Public URLs (External Links) */}
        <div className="footer-urls">
          {publicUrls.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-light)",
                textDecoration: "none",
                margin: "0 15px",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--primary-gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-light)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="footer-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-light)", margin: "0 10px" }}
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-light)", margin: "0 10px" }}
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-light)", margin: "0 10px" }}
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-light)", margin: "0 10px" }}
          >
            <FaGithub size={24} />
          </a>
        </div>

        {/* Footer Text */}
        <p className="mb-0" style={{ fontSize: "0.95rem" }}>
          © {currentYear}{" "}
          <span style={{ color: "var(--button-gold)" }}>My Portfolio</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
