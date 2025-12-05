import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import API from "../api/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    timings: ""
  });

  // Fetch contact info from backend
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/quotes", form);
      alert("Quote submitted successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Failed to submit quote.");
    }
  };

  return (
    <section className="contact-section py-5" style={{ backgroundColor: "#0A0A0A", color: "#EDEDED" }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "#FFD700" }}>Let’s Start Manufacturing</h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {/* Left Side: Contact Info */}
          <div style={{ flex: "1 1 300px", maxWidth: "400px", backgroundColor: "#1A1A1A", padding: "30px", borderRadius: "10px" }}>
            <h3 style={{ color: "#FFD700", marginBottom: "20px" }}>Contact Information</h3>
            {contactInfo.phone && <p><FaPhoneAlt style={{ marginRight: "10px", color: "#FFD700" }} /> {contactInfo.phone}</p>}
            {contactInfo.email && <p><FaEnvelope style={{ marginRight: "10px", color: "#FFD700" }} /> {contactInfo.email}</p>}
            {contactInfo.address && <p><FaMapMarkerAlt style={{ marginRight: "10px", color: "#FFD700" }} /> {contactInfo.address}</p>}
          </div>

          {/* Right Side: Contact Form */}
          <div style={{ flex: "1 1 300px", maxWidth: "600px", backgroundColor: "#1A1A1A", padding: "30px", borderRadius: "10px" }}>
            <h3 style={{ color: "#FFD700", marginBottom: "20px" }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="form-control"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn w-100" style={{ backgroundColor: "#FFD700", color: "#0A0A0A" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
