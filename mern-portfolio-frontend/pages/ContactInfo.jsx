import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

export default function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contact info
        const contactRes = await axios.get(`${API_BASE}/settings`);
        if (contactRes.data.contact) {
          setContactInfo({
            phone: contactRes.data.contact.phone || "",
            email: contactRes.data.contact.email || "",
            address: contactRes.data.contact.address || "",
          });
        }

        // Fetch social links
        const linksRes = await axios.get(`${API_BASE}/links`);
        if (linksRes.data.links) {
          setSocialLinks(linksRes.data.links);
        }
      } catch (err) {
        console.error("Failed to fetch contact info or links:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        flex: "1 1 300px",
        maxWidth: "400px",
        backgroundColor: "#1A1A1A",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ color: "#FFD700", marginBottom: "20px" }}>Contact Information</h3>

      {contactInfo.phone && (
        <p>
          <FaPhoneAlt style={{ marginRight: "10px", color: "#FFD700" }} />
          {contactInfo.phone}
        </p>
      )}

      {contactInfo.email && (
        <p>
          <FaEnvelope style={{ marginRight: "10px", color: "#FFD700" }} />
          {contactInfo.email}
        </p>
      )}

      {contactInfo.address && (
        <p>
          <FaMapMarkerAlt style={{ marginRight: "10px", color: "#FFD700" }} />
          {contactInfo.address}
        </p>
      )}

      {/* Social Links in a column */}
      <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "#FFD700", marginBottom: "10px" }}>Follow Me</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // column layout
            alignItems: "flex-start",
            gap: "15px", // spacing between each link
          }}
        >
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "#3b5998", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaFacebook size={24} /> {socialLinks.facebook}
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#1da1f2", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaXTwitter size={24} /> {socialLinks.twitter}
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "#e1306c", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaInstagram size={24} /> {socialLinks.instagram}
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaLinkedin size={24} /> {socialLinks.linkedin}
            </a>
          )}
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: "#333", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaGithub size={24} /> {socialLinks.github}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
