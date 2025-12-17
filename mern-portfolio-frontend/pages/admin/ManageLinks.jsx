import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Social media icons
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"

export default function ManageLinks() {
  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/links`, { withCredentials: true });
      if (res.data.links) setLinks(res.data.links);
    } catch (err) {
      toast.error("Failed to load links");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/links`, links, { withCredentials: true });
      toast.success("Links updated successfully!");
    } catch (err) {
      toast.error("Failed to update links");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "facebook", placeholder: "Facebook URL", icon: <FaFacebook size={20} /> },
    { key: "twitter", placeholder: "Twitter URL", icon: <FaXTwitter size={20} /> },
    { key: "instagram", placeholder: "Instagram URL", icon: <FaInstagram size={20} /> },
    { key: "linkedin", placeholder: "LinkedIn URL", icon: <FaLinkedin size={20} /> },
    { key: "github", placeholder: "GitHub URL", icon: <FaGithub size={20} /> },
  ];

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      {/* Form Section */}
      <h2 className="text-center mb-4" style={{ color: "var(--button-gold)" }}>
        Manage Social Links
      </h2>

      <div
        className="card p-4 shadow mb-4"
        style={{
          backgroundColor: "var(--rich-black)",
          color: "var(--text-light)",
          border: "1px solid var(--primary-gold)",
          borderRadius: "10px",
        }}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          {fields.map(({ key, placeholder, icon }) => (
            <div className="col-md-6 d-flex align-items-center" key={key} style={{ gap: "10px" }}>
              <div style={{ color: "var(--button-gold)" }}>{icon}</div>
              <input
                type="text"
                name={key}
                placeholder={placeholder}
                className="form-control"
                value={links[key]}
                onChange={handleChange}
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#EDEDED",
                  border: "1px solid var(--primary-gold)",
                }}
              />
            </div>
          ))}

          <div className="col-12">
            <button
              type="submit"
              className="btn w-100"
              disabled={loading}
              style={{
                backgroundColor: "var(--button-gold)",
                color: "var(--rich-black)",
                fontWeight: 600,
                transition: "0.3s ease",
              }}
            >
              {loading ? "Updating..." : "Update Links"}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <h4 style={{ color: "var(--button-gold)", marginBottom: "10px" }}>Preview Links</h4>
      <div className="social-links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  {links.facebook && (
    <div>
      <strong>Facebook:</strong>{" "}
      <a href={links.facebook} target="_blank" rel="noopener noreferrer">
        {links.facebook}
      </a>
    </div>
  )}

  {links.twitter && (
    <div>
      <strong>Twitter:</strong>{" "}
      <a href={links.twitter} target="_blank" rel="noopener noreferrer">
        {links.twitter}
      </a>
    </div>
  )}

  {links.instagram && (
    <div>
      <strong>Instagram:</strong>{" "}
      <a href={links.instagram} target="_blank" rel="noopener noreferrer">
        {links.instagram}
      </a>
    </div>
  )}

  {links.linkedin && (
    <div>
      <strong>LinkedIn:</strong>{" "}
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
        {links.linkedin}
      </a>
    </div>
  )}

  {links.github && (
    <div>
      <strong>GitHub:</strong>{" "}
      <a href={links.github} target="_blank" rel="noopener noreferrer">
        {links.github}
      </a>
    </div>
  )}
</div>

    </div>
  );
}
