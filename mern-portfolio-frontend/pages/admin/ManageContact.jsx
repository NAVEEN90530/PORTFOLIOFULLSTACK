import { useEffect, useState } from "react";
import API from "../../api/api.js";
import { toast } from "react-toastify";

export default function ManageContact() {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
  });

  // Load contact info
  const loadContact = () => {
    API.get("/settings").then((res) => {
      if (res.data && res.data.contact) {
        setContact(res.data.contact);
        setForm(res.data.contact);
      }
    });
  };

  useEffect(() => {
    loadContact();
  }, []);

  // Update contact info
  const updateContact = async (e) => {
    e.preventDefault();

    try {
      await API.put("/settings/contact", form);
      setContact(form); // update UI

      toast.success("Contact information updated successfully!");
    } catch (err) {
      console.error("Failed to update contact:", err);
      toast.error("Failed to update contact!");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4" style={{ color: "var(--button-gold)" }}>
        Manage Contact Information
      </h2>

      {/* FORM */}
      <div
        className="card shadow p-4"
        style={{
          backgroundColor: "var(--rich-black)",
          color: "var(--text-light)",
          border: "1px solid var(--primary-gold)",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={updateContact}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Email
            </label>
            <input
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                backgroundColor: "#1A1A1A",
                color: "#EDEDED",
                borderColor: "var(--primary-gold)",
              }}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Phone
            </label>
            <input
              className="form-control"
              placeholder="Enter phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{
                backgroundColor: "#1A1A1A",
                color: "#EDEDED",
                borderColor: "var(--primary-gold)",
              }}
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "var(--button-gold)" }}>
              Address
            </label>
            <input
              className="form-control"
              placeholder="Enter address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={{
                backgroundColor: "#1A1A1A",
                color: "#EDEDED",
                borderColor: "var(--primary-gold)",
              }}
            />
          </div>

          <button
            className="btn w-100 mt-2"
            style={{
              backgroundColor: "var(--button-gold)",
              color: "var(--rich-black)",
              fontWeight: 600,
            }}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* LIVE DISPLAY */}
      <div
        className="mt-4 p-3"
        style={{
          backgroundColor: "#111",
          borderRadius: "10px",
          border: "1px solid var(--primary-gold)",
          color: "var(--text-light)",
        }}
      >
        <h4 style={{ color: "var(--button-gold)" }}>Current Contact Info</h4>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Address:</strong> {contact.address}</p>
      </div>
    </div>
  );
}
