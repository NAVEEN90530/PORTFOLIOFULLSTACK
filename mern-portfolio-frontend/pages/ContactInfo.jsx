import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import API from "../api/api";

export default function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data.contact) {
          setContactInfo({
            phone: res.data.contact.phone || "",
            email: res.data.contact.email || "",
            address: res.data.contact.address || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch contact info:", err);
      }
    };

    fetchContact();
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
    </div>
  );
}
