import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageLinks() {
  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/links");
      setLinks(res.data);
    } catch (err) {
      toast.error("Failed to load links");
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
      await axios.put(
        "http://localhost:5000/api/links",
        links,
        { withCredentials: true }
      );
      toast.success("Links updated successfully!");
    } catch (err) {
      toast.error("Failed to update links");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h2
        className="text-center mb-4"
        style={{ color: "var(--button-gold)" }}
      >
        Manage Social Links
      </h2>

      <div
        className="card p-4 shadow"
        style={{
          backgroundColor: "var(--rich-black)",
          color: "var(--text-light)",
          border: "1px solid var(--primary-gold)",
          borderRadius: "10px",
        }}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          {[
            ["facebook", "Facebook URL"],
            ["twitter", "Twitter URL"],
            ["instagram", "Instagram URL"],
            ["linkedin", "LinkedIn URL"],
            ["github", "GitHub URL"],
          ].map(([key, placeholder]) => (
            <div className="col-md-6" key={key}>
              <label className="form-label" style={{ color: "var(--button-gold)" }}>
                {placeholder}
              </label>
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
              className="btn w-100"
              disabled={loading}
              style={{
                backgroundColor: "var(--button-gold)",
                color: "var(--rich-black)",
                fontWeight: 600,
                transition: "0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "var(--primary-gold)")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "var(--button-gold)")
              }
            >
              {loading ? "Updating..." : "Update Links"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
