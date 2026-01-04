import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineWhatsApp } from "react-icons/ai";

const WhatsAppRedirect = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Remove +, spaces, and non-numeric characters
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/\D/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = import.meta.env.VITE_API_URL;

        const contactRes = await axios.get(`${API_BASE}/settings`);

        if (contactRes.data?.contact) {
          setContactInfo({
            phone: contactRes.data.contact.phone || "",
            email: contactRes.data.contact.email || "",
            address: contactRes.data.contact.address || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch contact info:", err);
        setError("Failed to fetch contact info.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formattedPhone = formatPhoneNumber(contactInfo.phone);

  const message = `Welcome to Aurox Design Studio!

We're passionate about turning your ideas into reality with precision and creativity. Our team offers top-notch CAD design services to bring your projects to life.

What kind of support are you looking for?`;

  const whatsappUrl = formattedPhone
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    : "#";

  // ❌ Don't show button if loading or phone missing
  if (loading || !formattedPhone) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <AiOutlineWhatsApp
          size={50}
          color="#25D366"
          style={{ cursor: "pointer" }}
        />
      </a>
    </div>
  );
};

export default WhatsAppRedirect;
