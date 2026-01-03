import { useEffect, useState } from "react";
import API from "../../api/api.js";
import { toast } from "react-toastify";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing
import "font-awesome/css/font-awesome.min.css"; // Importing FontAwesome icons

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

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Error state

  // Load contact info
  const loadContact = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/settings");
      if (res.data?.contact) {
        setContact(res.data.contact);
        setForm(res.data.contact);
      }
    } catch (err) {
      setError("Failed to load contact information.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  // Validate form before submitting
  const validateForm = () => {
    const { email, phone, address } = form;

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    // Phone validation (basic check)
    const phoneRegex = /^[0-9+\-() ]{7,20}$/;
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number!");
      return false;
    }

    // Address validation
    if (!address) {
      toast.error("Address is required!");
      return false;
    }

    return true;
  };

  // Sanitize inputs (email, phone, address)
  const sanitizeInput = (input, type) => {
    if (type === "email") {
      // Sanitize email (basic, already validated)
      return DOMPurify.sanitize(input);
    }
    if (type === "phone") {
      // Sanitize phone number (remove unwanted characters)
      return input.replace(/[^0-9+\-() ]/g, '');
    }
    if (type === "address") {
      // Sanitize address (removes any dangerous HTML tags)
      return DOMPurify.sanitize(input);
    }
    return input;
  };

  // Update contact info
  const updateContact = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if validation passes

    setIsLoading(true);
    setError(""); // Reset error

    try {
      // Sanitize the inputs before sending to the API
      const sanitizedForm = {
        email: sanitizeInput(form.email, "email"),
        phone: sanitizeInput(form.phone, "phone"),
        address: sanitizeInput(form.address, "address"),
      };

      await API.put("/settings/contact", sanitizedForm);
      setContact(sanitizedForm); // Update UI

      toast.success("Contact information updated successfully!");
    } catch (err) {
      console.error("Failed to update contact:", err);
      setError("Failed to update contact information.");
      toast.error("Failed to update contact!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form field changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">
        <i className="fas fa-address-book" style={{ marginRight: "10px" }}></i>
        Manage Contact Information
      </h2>

      {/* FORM */}
      <div
        className="p-4 card-container"
        style={{
          backgroundColor: "var(--rich-black)",
          borderRadius: "10px",
          boxShadow: "0 2px 12px #FFD700",
        }}
      >
        <form onSubmit={updateContact}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#fff" }}>
              <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
              Email
            </label>
            <input
              name="email"
              className="form-control bg-dark text-light border-0"
              placeholder="Enter email"
              value={form.email}
              onChange={handleInputChange}
              aria-label="Email Address"
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#fff" }}>
              <i className="fas fa-phone-alt" style={{ marginRight: "8px" }}></i>
              Phone
            </label>
            <input
              name="phone"
              className="form-control bg-dark text-light border-0"
              placeholder="Enter phone"
              value={form.phone}
              onChange={handleInputChange}
              aria-label="Phone Number"
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#fff" }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: "8px" }}></i>
              Address
            </label>
            <input
              name="address"
              className="form-control bg-dark text-light border-0"
              placeholder="Enter address"
              value={form.address}
              onChange={handleInputChange}
              aria-label="Address"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 mt-2"
            style={{
              backgroundColor: "#FFD700",
              color: "#111111",
              fontWeight: 600,
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"> </i>
            ) : (
              <i className="fas fa-save"></i>
            )}
            {isLoading ? " Saving..." : " Save Changes"}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>

      {/* LIVE DISPLAY */}
      <div
        className="mt-4 p-3"
        style={{
          backgroundColor: "#111",
          borderRadius: "10px",
          border: "1px solid #FFD700",
          color: "#EDEDED",
        }}
      >
        <h4 style={{ color: "#FFD700" }}>Current Contact Info</h4>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Address:</strong> {contact.address}</p>
      </div>
    </div>
  );
}
