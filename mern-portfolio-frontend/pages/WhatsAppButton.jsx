import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const WhatsAppRedirect = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous errors


        const API_BASE = import.meta.env.VITE_API_URL;

        // Fetch contact info
        const contactRes = await axios.get(`${API_BASE}/settings`);
        if (contactRes.data.contact) {
          setContactInfo({
            phone: contactRes.data.contact.phone || "",
            email: contactRes.data.contact.email || "",
            address: contactRes.data.contact.address || "",
          });
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

  const { phone } = contactInfo;
  
  // Use emojis directly as Unicode in the message
  const message = `Welcome to Aurox Design Studio!

We're passionate about turning your ideas into reality with precision and creativity. Our team offers top-notch CAD design services to bring your projects to life. Let's create something awesome together!

What kind of support are you looking for?`;

  // Ensure the phone number is valid before generating the WhatsApp URL
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : "#"; // A fallback URL, for example, a # to prevent broken links

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <AiOutlineWhatsApp size={50} color="#25D366" />
      </a>
    </div>
  );
};

export default WhatsAppRedirect;
