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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous errors

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
          setSocialLinks(linksRes.data);
        }
      } catch (err) {
        setError("Failed to fetch contact info or social links.");
        console.error("Failed to fetch contact info or links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ color: "#FFD700", textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  // Social links info
  const socialMedia = [
    { name: "Facebook", icon: <FaFacebook size={24} />, url: socialLinks.facebook, color: "#3b5998" },
    { name: "Twitter", icon: <FaXTwitter size={24} />, url: socialLinks.twitter, color: "#1da1f2" },
    { name: "Instagram", icon: <FaInstagram size={24} />, url: socialLinks.instagram, color: "#e1306c" },
    { name: "LinkedIn", icon: <FaLinkedin size={24} />, url: socialLinks.linkedin, color: "#0077b5" },
    { name: "GitHub", icon: <FaGithub size={24} />, url: socialLinks.github, color: "#333" },
  ];

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

      {/* Social Links */}
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
          {socialMedia.map(({ name, icon, url, color }) =>
            url ? (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {icon} {url}
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
