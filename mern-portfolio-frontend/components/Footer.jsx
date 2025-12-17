import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });

  // Fetch links from backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/links`, { withCredentials: true });
        if (res.data.links) {
          setLinks(res.data.links);
        }
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };

    fetchLinks();
  }, []);

  const footerLinks = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Services", url: "/services" },
    { label: "Projects", url: "/projects" },
    { label: "Contact", url: "/contact" },
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
        {/* Primary Footer Links */}
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

        {/* Social Media Icons with text */}
        <div className="footer-icons" style={{ marginTop: "10px" }}>
          {links.facebook && (
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", margin: "0 10px" }}
            >
              <FaFacebook size={24} />
            </a>
          )}
          {links.twitter && (
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", margin: "0 10px" }}
            >
              <FaXTwitter size={24} />
            </a>
          )}
          {links.instagram && (
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", margin: "0 10px" }}
            >
              <FaInstagram size={24} />
            </a>
          )}
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", margin: "0 10px" }}
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-light)", margin: "0 10px" }}
            >
              <FaGithub size={24} />
            </a>
          )}
        </div>

        {/* Footer Text */}
        <p className="mb-0" style={{ fontSize: "0.95rem", marginTop: "10px" }}>
          © {currentYear} <span style={{ color: "var(--button-gold)" }}>My Portfolio</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
