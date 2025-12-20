import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

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

  // Fetch links when the component is mounted
  useEffect(() => {
    fetchLinks();
  }, []);

 // Fetch the current links from the backend
const fetchLinks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/links`, { withCredentials: true });
    if (res.data && res.data.links) {
      setLinks(res.data.links);  // Only set the links object
    }
  } catch (err) {
    toast.error("Failed to load links");
    console.error(err);
  }
};


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  // Handle the form submission to update the links
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const linksToUpdate = {
      facebook: links.facebook || "",
      twitter: links.twitter || "",
      instagram: links.instagram || "",
      linkedin: links.linkedin || "",
      github: links.github || "",
    };

    try {
      const res = await axios.put(`${API_BASE}/links`, linksToUpdate, { withCredentials: true });

      // If the update is successful, fetch the updated links again
      if (res.data && res.data.links) {
        setLinks(res.data.links);
        toast.success("Links updated successfully!");
      } else {
        toast.error("Failed to update links");
      }
    } catch (err) {
      toast.error("An error occurred while updating the links");
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
      <h2 className="text-center mb-4">Manage Social Links</h2>

      <div
        className="card p-4 shadow mb-4"
        style={{
          backgroundColor: "#111111",
          color: "#EDEDED",
          border: "1px solid #FFD700",
          borderRadius: "10px",
        }}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          {fields.map(({ key, placeholder, icon }) => (
            <div className="col-md-6 d-flex align-items-center" key={key} style={{ gap: "15px" }}>
              <div style={{ color: "#FFD700" }}>{icon}</div>
              <input
                type="text"
                name={key}
                placeholder={placeholder}
                className="form-control"
                value={links[key] || ""}
                onChange={handleChange}
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#EDEDED",
                  border: "1px solid #FFD700",
                  padding: "12px",
                  borderRadius: "8px",
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
                backgroundColor: "#FFD700",
                color: "#111111",
                fontWeight: 600,
                padding: "12px",
                borderRadius: "8px",
                transition: "0.3s ease",
                border: "none",
              }}
            >
              {loading ? "Updating..." : "Update Links"}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
<h4 style={{ color: "#FFD700", marginBottom: "12px" }}>Preview Links</h4>
<div
  className="social-links"
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#EDEDED",
  }}
>
  {Object.entries(links).map(([key, value]) => (
    // Exclude _id and updatedAt and ensure the link is valid
    (key !== "_id" && key !== "updatedAt" && value && typeof value === "string" && value.trim() !== "") && (
      <div key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: "#FFD700" }}>
          {value}
        </a>
      </div>
    )
  ))}
</div>


    </div>
  );
}
