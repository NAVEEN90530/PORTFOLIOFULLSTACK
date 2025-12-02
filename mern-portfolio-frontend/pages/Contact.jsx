import { useState } from "react";
import API from "../api/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

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
    <div className="container py-5">
      <h2>Contact / Get a Quote</h2>

      <form className="mt-4" onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Message"
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="btn btn-primary">Submit Quote</button>
      </form>
    </div>
  );
}
